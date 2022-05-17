import "snapsvg-cjs";
import { Board } from "./Board";
import { Building } from "./Building";
import { getYPosition, getXPosition, SelectMode } from "../utils/Constants";

export interface CursorProps { 
    board: Board;
    selection: string;
};

export class Cursor {
    board: Board;
    snap: Snap.Paper;
    x: number;
    y: number;
    selection: Building;
    selectMode: SelectMode;
    isSelected: boolean;
    point: DOMPoint;

    constructor({
        board,
        selection,
    }: CursorProps) {
        this.board = board;
        this.snap = this.board.snap;
        this.x = 0;
        this.y = 0;
        this.selection = Building.create(this.snap, selection, this.x, this.y);
        this.selectMode = SelectMode.ADD;
        this.isSelected = false;
        this.updateSelectMode(this.selectMode);
        this.point = new DOMPoint(0, 0);
    }

    private mouseMoveEvent = (event: MouseEvent) => {
        this.point.x = event.clientX;
        this.point.y = event.clientY;
        const pt = this.point.matrixTransform(this.board.elem.getScreenCTM()?.inverse());
        this.x = Math.max(Math.min(getXPosition(pt.x), this.board.width - this.selection.width), 0);
        this.y = Math.max(Math.min(getYPosition(pt.y), this.board.height - this.selection.height), 0);
        this.selection!.updatePosition(this.x, this.y);
    }

    private createCursorMouseDownEvent = (event: MouseEvent) => {
        if (this.selection.dataId === "cursor") {
            return;
        }
        this.board.addBuilding(Building.clone(this.selection));
    }

    private deleteCursorMouseDownEvent = (event: MouseEvent) => {
        this.selection.set.attr({
            display: "none",
        });

        const elem = this.board.getBuilding(event.clientX, event.clientY);
        this.board.deleteBuilding(elem.attr("id"));
        this.selection.set.attr({
            display: "",
        });
    }

    private selectCursorMouseDownEvent = (event: MouseEvent) => {
        if (!this.isSelected) {
            this.selection.set.attr({
                display: "none",
            });

            const elem = this.board.getBuilding(event.clientX, event.clientY);
            const id = elem.attr("id");          
            const building = this.board.buildings[id];

            if (!building) {
                this.selection.set.attr({
                    display: "",
                });
                return;
            }

            this.setSelection(building.dataId);
            this.isSelected = true;
            this.board.deleteBuilding(id);
            return;
        }

        this.createCursorMouseDownEvent(event);
        this.selection.set.attr({
            display: "",
        });
        this.setSelection("cursor");
        this.isSelected = false;
    }

    private doSelectMouseEvents = () => {
        this.setSelection("cursor");
        this.addMouseDownEvent([this.selectCursorMouseDownEvent]);
    }

    private doDeleteMouseEvents = () => {
        this.setSelection("cursor");
        this.addMouseMoveEvent([this.mouseMoveEvent]);
        this.addMouseDownEvent([this.deleteCursorMouseDownEvent]);
    }

    private doCreationMouseEvents = () => {
        this.addMouseMoveEvent([this.mouseMoveEvent]);
        this.addMouseDownEvent([this.createCursorMouseDownEvent]);
    }

    private addMouseMoveEvent = (events: {(hander: MouseEvent): void}[]) => {
        this.snap.unmousemove();
        this.snap.mousemove((event: MouseEvent) => {
            for (const action of events) {
                action(event);
            }
        });
    }

    private addMouseDownEvent = (events: {(hander: MouseEvent):void}[]) => {
        this.snap.unmouseup();
        this.snap.mouseup((event: MouseEvent) => {
            for (const action of events) {
                action(event);
            }
        });
    }

    setSelection = (selection: string) => {
        if (this.selectMode === SelectMode.ERASE) {
            return;
        }
        this.selection.clear();
        this.selection = Building.create(this.snap, selection, this.x, this.y);
    }

    updateSelectMode = (selectMode: SelectMode) => {
        switch (selectMode) {
            case SelectMode.ADD: 
                this.doCreationMouseEvents();
                break;
            case SelectMode.ERASE:
                this.doDeleteMouseEvents();
                break;
            case SelectMode.SELECT:
                this.doSelectMouseEvents();
                break;
        }
        this.selectMode = selectMode;
    }
};
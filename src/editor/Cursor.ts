import "snapsvg-cjs";
import { BuildingData } from "../data/BuildingData";
import { PositionTracker } from "./PositionTracker";

interface CursorProps {
    snap: Snap.Paper;
    action: Action;
    position: PositionTracker;
    buildingData: BuildingData;
    gridSize: number;
}

export enum Action {
    Create,
    Select,
    Delete,
}
export class Cursor {
    snap: Snap.Paper;
    action: Action;
    position: PositionTracker;
    buildingData: BuildingData | null;
    element: Snap.Element | null;
    gridSize: number;
    
    constructor({
        snap,
        action,
        position,
        buildingData,
        gridSize,
    }: CursorProps) {
        this.snap = snap;
        this.position = position;
        this.buildingData = buildingData;
        this.gridSize = gridSize;
        this.element = null;
        this.action = action;
        
        switch (action) {
            case Action.Select:
                break;
            case Action.Delete:
                this.actionDelete();
                break;
            case Action.Create:
                this.actionCreate();
                break;
        }
    }

    destroy() {
        this.element?.remove();
        this.snap.unmouseup();
        this.snap.unmousemove(this.getElementMove());
    }

    actionCreate() {
        const {
            name,
        } = this.buildingData!;
        this.element = this.snap.use(name) as Snap.Element;
        this.element.attr({
            opacity: 0.5,
        });

        this.elementMove(this.position);
        this.snap.mousemove(this.getElementMove());
        this.snap.mouseup(this.getElementMouseUp());
    }

    actionDelete() {
        this.snap.mouseup(event => {
            const elem = this.position.getUseElementFromMouseEvent(event);
            elem?.remove();
        });
    }

    actionSelect() {

    }

    getElementMouseUp() {
        return () => {
            const element = this.element;
            return this.elmentMouseUp(element);
        };
    }

    elmentMouseUp(element: Snap.Element | null) {
        const cur = element?.clone();
        cur?.attr({
            opacity: "",
        });
        cur?.hover(() => {
            cur.toggleClass("highlight", true);
            //cur.toggleClass(Action[this.action].toLowerCase(), true);
        }, () => {
            cur.toggleClass("highlight", false);
            //cur.toggleClass(Action[this.action].toLowerCase(), false);
        });
    }

    getElementMove() {
        return () => {
            const position = this.position;
            return this.elementMove(position);
        }
    }

    elementMove(position: PositionTracker) {
        const {
            gridX,
            gridY,
        } = position;
        this.element?.transform(`T${gridX * this.gridSize},${gridY * this.gridSize}`);
    }
}
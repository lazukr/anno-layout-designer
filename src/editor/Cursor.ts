import "snapsvg-cjs";
import { Board } from "./Board";
import { Building } from "./Building";
import { GRID } from "../utils/Constants";

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
    selectMode: boolean;
    eraseMode: boolean;
    point: DOMPoint;

    constructor({
        board,
        selection,
    }: CursorProps) {
        this.board = board;
        this.snap = this.board.snap;
        this.x = 0;
        this.y = 0;
        this.selection = this.createSelection(selection);
        this.selectMode = false;
        this.eraseMode = false;
        this.addMouseEvent();
        this.point = new DOMPoint(0, 0);
    }

    private addMouseEvent = () => {
        this.snap.mousemove((event: MouseEvent) => {
            this.point.x = event.clientX;
            this.point.y = event.clientY;
            const pt = this.point.matrixTransform(this.board.elem.getScreenCTM()?.inverse());
            this.x = Math.max(Math.min(this.getXPosition(pt.x), this.board.width - this.selection.width), 0);
            this.y = Math.max(Math.min(this.getYPosition(pt.y), this.board.height - this.selection.height), 0);
            this.selection!.updatePosition(this.x, this.y);
        });
    }

    private getXPosition = (x: number) => {
        return Math.floor(x / GRID.SIZE);
    }

    private getYPosition = (y: number) => {
        return Math.floor(y / GRID.SIZE);
    }

    private createSelection = (selection: string) => {
        return new Building({
            snap: this.snap,
            dataId: selection,
            x: this.x,
            y: this.y,
            placementMode: true,
        });
    }

    setSelection = (selection: string) => {
        this.selection.clear();
        this.selection = this.createSelection(selection);
    }

    enableEraseMode = () => {
        this.eraseMode = true;
    }
};
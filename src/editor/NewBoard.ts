import "snapsvg-cjs";
import { Direction, getAttrArgs, getLineArgs } from "../utils/drawing";


export interface NewBoardProps {
    snap: Snap.Paper;
    bound: DOMRect;
    width: number;
    height: number;
    gridSize: number;
};

export class NewBoard {
    snap: Snap.Paper;
    bound: DOMRect;
    width: number;
    height: number;
    gridSize: number;
    
    constructor({
        snap,
        bound,
        width,
        height,
        gridSize,
    }: NewBoardProps) {
        this.snap = snap;
        this.bound = bound;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.drawGrid();
    }

    drawGrid = () => {
        // draw rows 
        this.drawDirection(Direction.Horizontal);
        // draw cols
        this.drawDirection(Direction.Vertical);
    }

    drawDirection(direction: Direction) {
        const isHorizontal = direction === Direction.Horizontal;
        const numOfLines = isHorizontal ? this.width : this.height;
        const max = isHorizontal ? this.height : this.width;

        for (let i = 0; i < numOfLines + 1; i++) {
            const { x1, y1, x2, y2 } = getLineArgs(isHorizontal, i, max, this.gridSize);
            const attrArgs = getAttrArgs(i, numOfLines);
            this.snap.line(x1, y1, x2, y2).attr(attrArgs);
        }
    }
}
import "snapsvg-cjs";
import { BuildingData } from "../data/BuildingData";
import { getAllBuildingData } from "../data/Series";
import { Direction, getAttrArgs, getLineArgs } from "../utils/drawing";
import Path from "path-browserify";

export interface BoardProps {
    snap: Snap.Paper;
    width: number;
    height: number;
    gridSize: number;
};

export class Board {
    snap: Snap.Paper;
    width: number;
    height: number;
    gridSize: number;
    
    constructor({
        snap,
        width,
        height,
        gridSize,
    }: BoardProps) {
        this.snap = snap;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.drawBackground();
        this.drawGrid();
    }

    private drawGrid = () => {
        // draw rows 
        this.drawDirection(Direction.Horizontal);
        // draw cols
        this.drawDirection(Direction.Vertical);
    }

    private drawDirection(direction: Direction) {
        const isHorizontal = direction === Direction.Horizontal;
        const numOfLines = isHorizontal ? this.height : this.width;
        const max = isHorizontal ? this.width : this.height;

        for (let i = 0; i < numOfLines + 1; i++) {
            const { x1, y1, x2, y2 } = getLineArgs(isHorizontal, i, max, this.gridSize);
            const attrArgs = getAttrArgs(i, numOfLines);
            this.snap.line(x1, y1, x2, y2).attr(attrArgs);
        }
    }

    private drawBackground() {
        this.snap
            .rect(0, 0, this.width * this.gridSize, this.height * this.gridSize)
            .attr({
                fill: "#ffffff",
            });
    }
}
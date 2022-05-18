import "snapsvg-cjs";
import { LINE } from "../utils/Constants";

type LineArray = [number, number, number, number];
type LineGenerator = (index: number, max: number, gridSize: number) => LineArray;

const rowGenerator: LineGenerator = (index, max, gridSize) => {
    return [
        0, 
        index * gridSize,
        max * gridSize,
        index * gridSize,
    ];
}

const colGenerator: LineGenerator = (index, max, gridSize) => {
    return [ 
        index * gridSize,
        0,
        index * gridSize,
        max * gridSize,
    ];
}

interface GridBoardProps {
    snap: Snap.Paper;
    width: number;
    height: number;
    gridSize: number;
}

export class GridBoard {
    snap: Snap.Paper;

    constructor({
        snap,
        width,
        height,
        gridSize, 
    }: GridBoardProps) {
        this.snap = snap;
        this.drawGrid(width, height, gridSize);
    }

    private drawGrid = (width: number, height: number, gridSize: number) => {
        this.drawLines(height, width, gridSize, rowGenerator);
        this.drawLines(width, height, gridSize, colGenerator);
    }

    private drawLines = (numLines: number, lineLength: number, gridSize: number, lineGenerator: LineGenerator) => {
        for (let i = 0; i < numLines + 1; ++i) {
            if (i === 0 || i === numLines) { // add border lines
                this.snap
                    .line(...lineGenerator(i, lineLength, gridSize))
                    .attr(LINE.BORDER);
            } else if (i % 5 === 0) {       // add semi bold lines
                this.snap
                    .line(...lineGenerator(i, lineLength, gridSize))
                    .attr(LINE.BOLD);
            } else {                        // regular lines
                this.snap
                    .line(...lineGenerator(i, lineLength, gridSize))
                    .attr(LINE.NORMAL);
            }
        }
    }
}
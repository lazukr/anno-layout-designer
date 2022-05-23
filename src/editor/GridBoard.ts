import Snap from "snapsvg-cjs-ts";

interface GridBoardProps {
    snap: Snap.Paper;
    gridWidth: number;
    gridHeight: number;
    gridSize: number;
}

type LineProps = [number, number, number, number];
interface LineGenerator {
    (index: number, max: number, gridSize: number): LineProps;
};
interface LineDrawProps {
    (numberOfLines: number, lineLength: number, gridSize: number, lineGenerator: LineGenerator): void;
};

const LINE = {
    NORMAL: {
        stroke: 'black',
        strokeWidth: 0.25,
        width: 1,
    },
    SEMI_BOLD: {
        stroke: 'black',
        strokeWidth: 0.5,
        width: 1,
    },
    BOLD: {
        stroke: 'black',
        strokeWidth: 1,
        width: 1,
    },
    BORDER: {
        stroke: 'black',
        strokeWidth: 5,
        width: 1,
    }
};

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


export class GridBoard {
    snap: Snap.Paper;

    constructor({
        snap,
        gridWidth,
        gridHeight,
        gridSize,
    }: GridBoardProps) {
        this.snap = snap;
        this.drawLines(gridWidth, gridHeight, gridSize, colGenerator);
        this.drawLines(gridHeight, gridWidth, gridSize, rowGenerator);
    }

    private drawLines: LineDrawProps = (numLines, lineLength, gridSize, lineGenerator) => {
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
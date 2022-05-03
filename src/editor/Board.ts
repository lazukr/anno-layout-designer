import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID, LINE } from "../utils/Constants";

declare const Snap: typeof SNAPSVG_TYPE;

export interface BoardProps {
    canvas: string;
    width: number;
    height: number;
};

type LineArray = [number, number, number, number];
type LineGenerator = (index: number, max: number) => LineArray;

const rowGenerator: LineGenerator = (index, max) => {
    return [
        0, 
        index * GRID.SIZE,
        max * GRID.SIZE,
        index * GRID.SIZE,
    ];
}

const colGenerator: LineGenerator = (index, max) => {
    return [ 
        index * GRID.SIZE,
        0,
        index * GRID.SIZE,
        max * GRID.SIZE,
    ];
}

export class Board {
    snap: Snap.Paper;
    width: number;
    height: number;
    bbox: Snap.BBox;
    elem: SVGGraphicsElement;

    constructor({
        width,
        height,
        canvas,
    }: BoardProps) {
        const svgId = `#${canvas}`;
        this.elem = document.querySelector(svgId) as SVGGraphicsElement;
        this.width = width;
        this.height = height;
        this.snap = Snap(svgId);
        this.snap.clear();
        this.bbox = this.snap.getBBox();
        this.drawGrid();
    }

    private drawGrid = () => {
        this.drawLines(this.width, rowGenerator);
        this.drawLines(this.height, colGenerator);
    }

    private drawLines = (maxSize: number, lineGenerator: LineGenerator) => {
        for (let i = 0; i < maxSize + 1; ++i) {
            if (i === 0 || i === maxSize) { // add border lines
                this.snap
                    .line(...lineGenerator(i, maxSize))
                    .attr(LINE.BORDER);
            } else if (i % 5 === 0) {       // add semi bold lines
                this.snap
                    .line(...lineGenerator(i, maxSize))
                    .attr(LINE.BOLD);
            } else {                        // regular lines
                this.snap
                    .line(...lineGenerator(i, maxSize))
                    .attr(LINE.NORMAL);
            }
        }
    }
};
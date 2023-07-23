import { Direction, getAttrArgs, getLineArgs } from "../editor/lines";
import { Svg } from "@svgdotjs/svg.js";

export interface BoardProps {
    svg: Svg;
    width: number;
    height: number;
    gridSize: number;
};

export class Board {
    svg: Svg;
    width: number;
    height: number;
    gridSize: number;
    
    constructor({
        svg,
        width,
        height,
        gridSize,
    }: BoardProps) {
        this.svg = svg;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.drawBackground("#ffffff");
        this.drawGrid();
    }

    private drawGrid = () => {
        this.drawDirection(Direction.Horizontal);
        this.drawDirection(Direction.Vertical);
    }

    private drawDirection(direction: Direction) {
        const isHorizontal = direction === Direction.Horizontal;
        const numOfLines = isHorizontal ? this.height : this.width;
        const max = isHorizontal ? this.width : this.height;

        for (let i = 0; i < numOfLines + 1; i++) {
            const { x1, y1, x2, y2 } = getLineArgs(isHorizontal, i, max, this.gridSize);
            const attrArgs = getAttrArgs(i, numOfLines);
            this.svg.line(x1, y1, x2, y2).stroke({
                width: attrArgs.width,
                color: attrArgs.colour,
            });
        }
    }

    private drawBackground(colour: string) {
        this.svg
            .rect(this.width * this.gridSize, this.height * this.gridSize)
            .fill(colour);
    }
}
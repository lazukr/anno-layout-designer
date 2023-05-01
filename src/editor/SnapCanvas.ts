import { SVG, Svg } from "@svgdotjs/svg.js";
import { Board } from "./Board";
import { Action, Cursor } from "./Cursor";
import { createAllBuildings } from "./Building";
import { PositionTracker } from "./PositionTracker";

export const GRID_SIZE = 32;

interface SnapCanvasProps {
    id: string;
    width: number;
    height: number;
    highlighter: () => string;
};


export class SnapCanvas {
    static id: string;
    private svg: Svg;
    private cursor?: Cursor;
    private positionTracker: PositionTracker;
    private gridSize: number;
    private highlighter: () => string;
    
    constructor({
        id,
        width,
        height,
        highlighter,
    }: SnapCanvasProps) {
        SnapCanvas.id = id;
        this.gridSize = GRID_SIZE;
        this.highlighter = highlighter;

        const realWidth = this.gridSize * width;
        const realHeight = this.gridSize * height;

        this.svg = SVG(id)
            .size(realWidth, realHeight) as Svg;

        this.svg.clear();
        this.positionTracker = new PositionTracker(this.svg);

        createAllBuildings(this.svg, GRID_SIZE);

        new Board({
            svg: this.svg,
            width: width,
            height: height,
            gridSize: GRID_SIZE,
        });
    }

    setCursor(action: Action, buildingName: string) {
        this.cursor = new Cursor({
            svg: this.svg,
            action: action,
            positionTracker: this.positionTracker,
            buildingName: buildingName,
            gridSize: this.gridSize,
            getHighlight: this.highlighter,
        });
    }

    static GetCurrentSVG() {
        return SVG(SnapCanvas.id) as Svg;
    }
}
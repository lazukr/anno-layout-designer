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
    static highlighter: () => string;
    private static instance: SnapCanvas;
    private svg: Svg;
    private cursor?: Cursor;
    private positionTracker: PositionTracker;
    private gridSize: number;
    
    constructor({
        id,
        width,
        height,
        highlighter,
    }: SnapCanvasProps) {
        SnapCanvas.id = id;
        SnapCanvas.highlighter = highlighter;
        SnapCanvas.instance = this;
        this.gridSize = GRID_SIZE;
        this.svg = SVG(id) as Svg;
        this.setBoard(width, height);
        this.positionTracker = new PositionTracker(this.svg);  
    }

    setBoard(width: number, height: number) {
        const realWidth = this.gridSize * width;
        const realHeight = this.gridSize * height;

        this.svg.size(realWidth, realHeight);
        this.svg.clear();
        createAllBuildings(this.svg, GRID_SIZE);

        new Board({
            svg: this.svg,
            width: width,
            height: height,
            gridSize: GRID_SIZE,
        });
    }

    setCursor(action: Action, buildingName: string) {
        this.cursor?.destroy();
        this.cursor = new Cursor({
            svg: this.svg,
            action: action,
            positionTracker: this.positionTracker,
            buildingName: buildingName,
            gridSize: this.gridSize,
            getHighlight: SnapCanvas.highlighter,
        });
    }

    static GetCurrentSVG() {
        return SVG(SnapCanvas.id) as Svg;
    }

    static GetInstance() {
        return SnapCanvas.instance;
    }
}
import { SVG, Svg } from "@svgdotjs/svg.js";
import { Board } from "./Board";
//import { Action, Cursor } from "./Cursor";
import { createAllBuildings } from "./Building";
import { PositionTracker } from "./PositionTracker";
import { Action } from "./action";
import { Brush } from "./Brush";

export const GRID_SIZE = 32;

interface SvgCanvasProps {
    id: string;
    width: number;
    height: number;
    highlighter: () => string;
};

export class SvgCanvas {
    static id: string;
    static highlighter: () => string;
    private static instance: SvgCanvas;
    private svg: Svg;
    private positionTracker: PositionTracker;
    private gridSize: number;
    
    constructor({
        id,
        width,
        height,
        highlighter,
    }: SvgCanvasProps) {
        SvgCanvas.id = id;
        SvgCanvas.highlighter = highlighter;
        SvgCanvas.instance = this;
        this.gridSize = GRID_SIZE;
        this.svg = SVG(id) as Svg;
        this.positionTracker = new PositionTracker(this.svg, this.gridSize);
        this.setBoard(width, height);
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

    setBrush(action: Action, buildingNaame: string) {

    }

    /*
    setCursor(action: Action, buildingName: string) {
        this.brus


        this.cursor?.destroy();
        this.cursor = new Cursor({
            svg: this.svg,
            action: action,
            positionTracker: this.positionTracker,
            buildingName: buildingName,
            gridSize: this.gridSize,
            getHighlight: SvgCanvas.highlighter,
        });
    }
    */

    static GetCurrentSVG() {
        return SVG(SvgCanvas.id) as Svg;
    }

    static GetInstance() {
        return SvgCanvas.instance;
    }
}
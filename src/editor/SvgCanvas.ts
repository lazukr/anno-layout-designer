import { SVG, Svg } from "@svgdotjs/svg.js";
import { Board } from "./Board";
import { createAllBuildings } from "./Building";
import { Cursor } from "./Cursor";

export const GRID_SIZE = 32;

interface SvgCanvasProps {
    id: string;
    width: number;
    height: number;
    highlighter: () => string;
};

export class SvgCanvas {
    static id: string;
    private static svg: Svg;
    private static gridSize: number;
    private static cursor: Cursor;

    static setSvg(svg: SVGSVGElement) {
        SvgCanvas.svg = SVG(svg) as Svg;
    }

    static setGridSize(gridSize: number) {
        SvgCanvas.gridSize = gridSize;
    }

    static setCursor() {
        SvgCanvas.cursor = new Cursor(SvgCanvas.svg, SvgCanvas.gridSize);
    }
    
    static setBoard(width: number, height: number) {
        const realWidth = this.gridSize * width;
        const realHeight = this.gridSize * height;

        SvgCanvas.svg.size(realWidth, realHeight);
        SvgCanvas.svg.clear();
        createAllBuildings(SvgCanvas.svg, GRID_SIZE);

        new Board({
            svg: SvgCanvas.svg,
            width: width,
            height: height,
            gridSize: GRID_SIZE,
        });
    }

    static GetCursor() {
        return SvgCanvas.cursor;
    }

    static GetSVG() {
        return SvgCanvas.svg;
    }
}
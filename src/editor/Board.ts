import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID } from "../utils/Constants";
import { Building } from "./Building";
import { GridBoard } from "./GridBoard";
import { BuildingBoard } from "./BuildingBoard";

declare const Snap: typeof SNAPSVG_TYPE;

export interface BoardProps {
    canvas: string;
    width: number;
    height: number;
};

export class Board {
    private elem: SVGGraphicsElement;
    snap: Snap.Paper;
    width: number;
    height: number;

    gridBoard: GridBoard;
    buildingBoard: BuildingBoard;
    buildings: {[key:string]: Building};

    constructor({
        width,
        height,
        canvas,
    }: BoardProps) {
        const svgId = `#${canvas}`;
        this.elem = document.querySelector(svgId) as SVGGraphicsElement;
        this.width = width;
        this.height = height;
        this.buildings = {};

        this.snap = Snap(svgId);
        this.snap.clear();

        // creates the grids
        this.gridBoard = new GridBoard({
            snap: this.snap,
            width: width,
            height: height,
            gridSize: GRID.SIZE,
        });

        this.buildingBoard = new BuildingBoard({
            snap: this.snap,
            gridSize: GRID.SIZE,
        });
    }

    get cursorGridMatrix() {
        return this.elem.getScreenCTM()!.inverse();
    }

    addBuilding(building: Building) {
        this.buildings[building.bid] = building;
    }

    getBuilding(x: number, y: number) {
        const elem = Snap.getElementByPoint(x, y);
        return elem;
    }

    deleteBuilding(id: string) {
        const building = this.buildings[id];
        building?.clear();
        delete this.buildings[id];
    }
};
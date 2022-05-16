import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";
import { GRID, LINE } from "../utils/Constants";
import { BUILDING_NAMES } from "../data/DataMapper";
import { Building } from "./Building";

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
    buildings: {[key:string]: Building};
    buildingSet: Snap.Paper;

    get buildingList(): Building[] {
        return Object.values(this.buildings);
    }

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
        this.bbox = this.snap.getBBox();
        
        this.buildingSet = this.snap.group();
        this.buildingSet.clear();

        this.createUseElements();
        this.drawGrid();
    }

    addBuilding(building: Building) {
        this.buildings[building.bid] = building;
        this.buildingSet.add(building.set);
    }

    private drawGrid = () => {
        this.drawLines(this.height, this.width, rowGenerator);
        this.drawLines(this.width, this.height, colGenerator);
    }

    private drawLines = (numLines: number, lineLength: number,  lineGenerator: LineGenerator) => {
        for (let i = 0; i < numLines + 1; ++i) {
            if (i === 0 || i === numLines) { // add border lines
                this.snap
                    .line(...lineGenerator(i, lineLength))
                    .attr(LINE.BORDER);
            } else if (i % 5 === 0) {       // add semi bold lines
                this.snap
                    .line(...lineGenerator(i, lineLength))
                    .attr(LINE.BOLD);
            } else {                        // regular lines
                this.snap
                    .line(...lineGenerator(i, lineLength))
                    .attr(LINE.NORMAL);
            }
        }
    }

    private createUseElements = () => {
        BUILDING_NAMES.forEach(building => {
            Building.createSpriteModel({
                snap: this.snap,
                id: building,
            }).attr({
                id: building,
            }).toDefs();
        });
    }
};
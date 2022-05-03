import "snapsvg-cjs";
import _BuildingData from "../data/buildings.json";
import { GRID } from "../utils/Constants";

interface BuildingData {
    id: string;
    width: number;
    height: number;
}

type BuildingCollection = {[key: string]: BuildingData};

export const Buildings: BuildingCollection = _BuildingData;

interface BuildingProps {
    dataId: string;
    snap: Snap.Paper;
    x: number;
    y: number;
}

export class Building {
    snap: Snap.Paper;
    dataId: string;
    sprite: Snap.Element;
    width: number;
    height: number;

    constructor({
        snap,
        dataId,
        x,
        y,
    }: BuildingProps) {
        this.snap = snap;
        this.dataId = dataId;
        const info = Buildings[dataId];
        this.width = info.width;
        this.height = info.height;

        this.sprite = this.snap.rect(
            x * GRID.SIZE, 
            y * GRID.SIZE, 
            this.width * GRID.SIZE, 
            this.height * GRID.SIZE);
    }

    updatePosition(x: number, y: number) {
        this.sprite.attr({x: x, y: y});
    }
}


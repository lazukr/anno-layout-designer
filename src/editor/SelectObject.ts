import Snap from "snapsvg-cjs-ts";
import { BUILDINGS } from "../data/DataMapper";
import { BuildingProps } from "./DataBoard";

interface SelectionProps {
    data: BuildingProps;
    element: Snap.Element;
}

export class SelectObject {
    element: Snap.Element;
    data: BuildingProps;
    gridWidth: number;
    gridHeight: number;

    constructor({
        element,
        data,
    }: SelectionProps) {
        this.element = element;
        const info = BUILDINGS[data.buildingId];
        this.gridWidth = info.width;
        this.gridHeight = info.height;
        this.data = data;
    }

    updatePosition(gridX: number, gridY: number, gridSize: number) {
        this.data.gridX = gridX;
        this.data.gridY = gridY;
        this.element.transform(`t${gridX * gridSize},${gridY * gridSize}`);
    }
}
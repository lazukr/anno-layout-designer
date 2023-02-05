import "snapsvg-cjs";
import { BuildingData } from "../data/BuildingData";
import { getAllBuildingData } from "../data/Series";
import { Direction, getAttrArgs, getLineArgs } from "../utils/drawing";
import Path from "path-browserify";

export interface BoardProps {
    snap: Snap.Paper;
    width: number;
    height: number;
    gridSize: number;
};

export class Board {
    snap: Snap.Paper;
    width: number;
    height: number;
    gridSize: number;
    
    constructor({
        snap,
        width,
        height,
        gridSize,
    }: BoardProps) {
        this.snap = snap;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.drawGrid();
    }

    drawGrid = () => {
        // draw rows 
        this.drawDirection(Direction.Horizontal);
        // draw cols
        this.drawDirection(Direction.Vertical);
    }

    drawDirection(direction: Direction) {
        const isHorizontal = direction === Direction.Horizontal;
        const numOfLines = isHorizontal ? this.width : this.height;
        const max = isHorizontal ? this.height : this.width;

        for (let i = 0; i < numOfLines + 1; i++) {
            const { x1, y1, x2, y2 } = getLineArgs(isHorizontal, i, max, this.gridSize);
            const attrArgs = getAttrArgs(i, numOfLines);
            this.snap.line(x1, y1, x2, y2).attr(attrArgs);
        }
    }
}

export const createAllBuildings = (snap: Snap.Paper, gridSize: number) => {
    const buildings = getAllBuildingData();
    buildings.forEach(building => {
        createBuilding(snap, building, gridSize);
    });
}

const createBuilding = (snap: Snap.Paper, building: BuildingData, gridSize: number) => {
    const {
        width,
        height,
        colour,
        name,
    } = building;

    const squareSize = Math.min(width, height) / 2;
    const centerX = width / 2 - squareSize / 2;
    const centerY = height / 2 - squareSize / 2;
    
    const background = snap
        .rect(1, 1, width * gridSize - 2, height * gridSize - 2)
        .attr({
            fill: colour,
        });

    const sprite = snap.image(
        Path.join(process.env.PUBLIC_URL, building.imagePath),
        centerX * gridSize,
        centerY * gridSize,
        squareSize * gridSize,
        squareSize * gridSize,
    );

    const model = snap.g(...[background, sprite])
        .attr({
            id: name,
        });

    model.toDefs();
}
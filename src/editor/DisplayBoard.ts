import Snap from "snapsvg-cjs-ts";
import { GridBoard } from "./GridBoard";
import { v4 as uuidv4 } from "uuid";
import { BuildingProps } from "./DataBoard";
import { SelectObject } from "./SelectObject";
import { BUILDINGS, BUILDING_NAMES } from "../data/DataMapper";
import { IMAGE_PATH } from "../utils/Constants";

interface DisplayBoardProps {
    snap: Snap.Paper;
    graphicsElement: SVGGraphicsElement;
    gridWidth: number;
    gridHeight: number;
    gridSize: number;
};

interface SpriteModelProps {
    id: string;
    snap: Snap.Paper;
    gridSize: number;
    rotated: boolean;
}

export class DisplayBoard {
    snap: Snap.Paper;
    gridWidth: number;
    gridHeight: number;
    gridSize: number;
    graphicsElement: SVGGraphicsElement;
    displayBuildings: {[key: string]: Snap.Element};

    constructor({
        snap,
        graphicsElement,
        gridWidth,
        gridHeight,
        gridSize,
    }: DisplayBoardProps) {
        this.snap = snap;
        this.graphicsElement = graphicsElement;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.gridSize = gridSize;
        this.displayBuildings = {};
        this.createUseElements();

        new GridBoard({
            snap,
            gridWidth,
            gridHeight,
            gridSize,
        });
    }

    get screenToPositionMap() {
        return this.graphicsElement.getScreenCTM()?.inverse();
    }

    createDisplayBuilding(buildingId: string, gridX: number, gridY: number) {
        const display = this.snap.use(buildingId) as Snap.Element;
        const instanceId = uuidv4();
        display.attr({
            instanceId: instanceId,
            opacity: 0.6,
        });

        const data: BuildingProps = {
            instanceId: instanceId,
            buildingId: buildingId,
            gridX: gridX,
            gridY: gridY,
            isRotated: false,
        };

        const selection = new SelectObject({
            element: display,
            data: data,
        });

        selection.updatePosition(gridX, gridY, this.gridSize);
        return selection;
    }

    getDisplayBuildingByPoint(x: number, y: number) {
        const display = Snap.getElementByPoint(x, y);
        const instanceId = display.attr("instanceId");
        return this.getDisplayBuildingByInstanceId(instanceId);
    }

    getDisplayBuildingByInstanceId(instanceId: string) {
        const display = this.displayBuildings[instanceId];
        delete this.displayBuildings[instanceId];
        return display;
    }

    deleteDisplayBuilding(instanceId: string) {
        const display = this.displayBuildings[instanceId];
        display.remove();
        delete this.displayBuildings[instanceId];
    }

    private createUseElements = () => {
        BUILDING_NAMES.forEach(building => {
            DisplayBoard.createSpriteModel({
                snap: this.snap,
                id: building,
                rotated: false,
                gridSize: this.gridSize,
            }).attr({
                id: building,
            }).toDefs();

            // rotated version
            DisplayBoard.createSpriteModel({
                snap: this.snap,
                id: building,
                rotated: true,
                gridSize: this.gridSize,
            }).attr({
                id: `${building}_rotated`,
            }).toDefs();
        });
    }
    

    static createSpriteModel = ({
        snap,
        id,
        rotated,
        gridSize,
    }: SpriteModelProps) => {

        const { width, height, colour } = BUILDINGS[id];
        const actualWidth = rotated ? height : width;
        const actualHeight = rotated ? width : height;
        const squareSize = Math.min(actualWidth, actualHeight) / 2;
        const centerX = actualWidth / 2 - squareSize / 2;
        const centerY = actualHeight / 2 - squareSize / 2;
        const background = snap.rect(
            0.5,
            0.5,
            actualWidth * gridSize - 1, 
            actualHeight * gridSize - 1)
            .attr({
                "fill-opacity": 1,
                stroke: "#000",
                fill: colour,
                strokeWidth: 2,
                "paint-order": "stroke"
            });

        const sprite = snap.image(
            `${IMAGE_PATH}${id}.png`,
            centerX * gridSize,
            centerY * gridSize,
            squareSize * gridSize,
            squareSize * gridSize,
        );
        const set = snap.g(...[background, sprite]);
        return set;
    }
}
import "snapsvg-cjs";
import { BUILDINGS, BUILDING_NAMES } from "../data/DataMapper";
import { IMAGE_PATH } from "../utils/Constants";

interface BuildingBoardProps {
    snap: Snap.Paper;
    gridSize: number;
}

interface SpriteModelProps {
    id: string;
    snap: Snap.Paper;
    rotated: boolean;
    gridSize: number;
}

export class BuildingBoard {
    snap: Snap.Paper;
    gridSize: number;

    constructor({
        snap,
        gridSize,
    }: BuildingBoardProps) {
        this.snap = snap;
        this.gridSize = gridSize;
        this.createUseElements();
    }

    getElement(x: number, y: number) {

    }

    selectElement(id: string) {

    }

    deleteElement(id: string) {

    }

    private createUseElements = () => {
        BUILDING_NAMES.forEach(building => {
            BuildingBoard.createSpriteModel({
                snap: this.snap,
                id: building,
                gridSize: this.gridSize,
                rotated: false,
            }).attr({
                id: building,
            }).toDefs();

            // rotated version
            BuildingBoard.createSpriteModel({
                snap: this.snap,
                id: building,
                gridSize: this.gridSize,
                rotated: true,
            }).attr({
                id: `${building}_rotated`,
            }).toDefs();
        });
    }

    static createSpriteModel = ({
        snap,
        id,
        gridSize,
        rotated,
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
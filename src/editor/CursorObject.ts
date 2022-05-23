import { getXPosition, getYPosition } from "../utils/Constants";
import { DataBoard } from "./DataBoard";
import { DisplayBoard } from "./DisplayBoard";
import { SelectObject } from "./SelectObject";

interface CursorObjectProps {
    displayBoard: DisplayBoard;
    dataBoard: DataBoard;
}

export class CursorObject {
    displayBoard: DisplayBoard;
    dataBoard: DataBoard;
    selectObject: SelectObject;
    gridX: number;
    gridY: number;

    constructor({
        displayBoard,
        dataBoard,
    }: CursorObjectProps) {
        this.displayBoard = displayBoard;
        this.dataBoard = dataBoard;
        this.gridX = 0;
        this.gridY = 0;
        this.selectObject = this.displayBoard.createDisplayBuilding("cursor", 0, 0);
        this.attachMouseMoveEvent();
    }

    getGridPosition(position: number, max: number, objectSize: number) {
        return Math.max(Math.min(position, max - objectSize), 0);
    }

    cursorMove = (gridX: number, gridY: number) => {
        const inBoundGridX = this.getGridPosition(gridX, this.displayBoard.gridWidth, this.selectObject.gridWidth);
        const inBoundGridY = this.getGridPosition(gridY, this.displayBoard.gridHeight, this.selectObject.gridHeight);
        this.selectObject.updatePosition(inBoundGridX, inBoundGridY, this.displayBoard.gridSize);
    }

    attachMouseMoveEvent() {
        this.displayBoard.snap.unmousemove(() => {});
        this.displayBoard.snap.mousemove((event: MouseEvent) => {
            const position = new DOMPoint(event.clientX, event.clientY);
            const point = position.matrixTransform(this.displayBoard.screenToPositionMap);

            const gridX = getXPosition(point.x);
            const gridY = getYPosition(point.y);

            if (this.gridX !== gridX || this.gridY !== gridY) {
                this.gridX = gridX;
                this.gridY = gridY;
                this.cursorMove(this.gridX, this.gridY);
            }
        });
    }

    setSelectObject(buildingId: string) {
        this.selectObject.element.remove();
        this.selectObject = this.displayBoard.createDisplayBuilding(buildingId, this.gridX, this.gridY);
        this.cursorMove(this.gridX, this.gridY);
    }
}
import "snapsvg-cjs";
import { Building } from "../data/BuildingData";
import { CreateCursor } from "./CreateCursor";
import { Action, EditorCursor } from "./Cursor";
import { DeleteCursor } from "./DeleteCursor";
import { PositionTracker } from "./PositionTracker";

interface SelectCursorProps {
    snap: Snap.Paper;
    position: PositionTracker;
    buildingData: Building;
    gridSize: number;
}

export class SelectCursor implements EditorCursor {
    snap: Snap.Paper;
    position: PositionTracker;
    gridSize: number;
    internalCursor: EditorCursor;
    selectMode: boolean;
    
    constructor({
        snap,
        position,
        gridSize,
    }: SelectCursorProps) {
        this.snap = snap;
        this.position = position;
        this.gridSize = gridSize;
        this.selectMode = true;
        this.internalCursor = new DeleteCursor({
            snap: snap,
            position: position,
            gridSize: gridSize,
        });
    }

    destroy() {
        this.internalCursor.destroy();
    }

    actionSelect() {
        this.snap.mouseup(event => {
            this.internalCursor.destroy();
            if (this.selectMode) {
                this.internalCursor = new CreateCursor({
                    snap: this.snap,
                    position: this.position,
                    buildingName: "test",
                    gridSize: this.gridSize,
                });
            } else {
                this.internalCursor = new DeleteCursor({
                    snap: this.snap,
                    position: this.position,
                    gridSize: this.gridSize,
                });
            }
            this.selectMode = !this.selectMode;
        });
    }
}
import "snapsvg-cjs";
import { Building } from "../data/Building";
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
            gridSize: gridSize,
        });
    }

    destroy() {
        this.internalCursor.destroy();
    }

    actionSelect() {
        this.snap.mouseup(event => {
            this.internalCursor.destroy();
        });
    }
}
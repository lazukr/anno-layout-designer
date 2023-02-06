import "snapsvg-cjs";
import { PositionTracker } from "./PositionTracker";

interface DeleteCursorProps {
    snap: Snap.Paper;
    position: PositionTracker;
    gridSize: number;
}

export class DeleteCursor {
    snap: Snap.Paper;
    position: PositionTracker;
    gridSize: number;
    
    constructor({
        snap,
        position,
        gridSize,
    }: DeleteCursorProps) {
        this.snap = snap;
        this.position = position;
        this.gridSize = gridSize;
        this.actionDelete();
    }

    destroy() {
        this.snap.unmouseup();
    }

    actionDelete() {
        this.snap.mouseup(event => {
            const elem = this.position.getUseElementFromMouseEvent(event);
            console.log(elem?.attr("href"));
            elem?.remove();
        });
    }
}
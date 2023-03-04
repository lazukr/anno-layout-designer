import "snapsvg-cjs";
import { PositionTracker } from "./PositionTracker";

interface DeleteCursorProps {
    snap: Snap.Paper;
    gridSize: number;
}

export class DeleteCursor {
    snap: Snap.Paper;
    gridSize: number;
    
    constructor({
        snap,
        gridSize,
    }: DeleteCursorProps) {
        this.snap = snap;
        this.gridSize = gridSize;
        this.actionDelete();
    }

    destroy() {
        this.snap.unmouseup();
    }

    actionDelete() {
        this.snap.mouseup(event => {
            const elem = PositionTracker.getUseElementFromMouseEvent(event);
            console.log(elem?.attr("href"));
            elem?.remove();
        });
    }
}
import "snapsvg-cjs";
import { Action, EditorCursor } from "./Cursor";
import { PositionTracker } from "./PositionTracker";

interface CreateCursorProps {
    snap: Snap.Paper;
    position: PositionTracker;
    buildingName: string;
    gridSize: number;
}

export class CreateCursor implements EditorCursor {
    snap: Snap.Paper;
    position: PositionTracker;
    buildingName: string;
    element: Snap.Element | null;
    gridSize: number;
    
    constructor({
        snap,
        position,
        buildingName,
        gridSize,
    }: CreateCursorProps) {
        this.snap = snap;
        this.position = position;
        this.buildingName = buildingName;
        this.gridSize = gridSize;
        this.element = null;
        this.actionCreate();
    }

    destroy() {
        this.element?.remove();
        this.snap.unmouseup();
        this.snap.unmousemove(this.getElementMove());
    }

    actionCreate() {
        this.element = this.snap.use(this.buildingName) as Snap.Element;
        this.element.attr({
            opacity: 0.5,
        });

        this.elementMove(this.position);
        this.snap.mousemove(this.getElementMove());
        this.snap.mouseup(this.getElementMouseUp());
    }

    getElementMouseUp() {
        return () => {
            const element = this.element;
            return this.elmentMouseUp(element);
        };
    }

    elmentMouseUp(element: Snap.Element | null) {
        const cur = element?.clone();
        cur?.attr({
            opacity: "",
        });
        cur?.hover(() => {
            cur.toggleClass("highlight", true);
        }, () => {
            cur.toggleClass("highlight", false);
        });
    }

    getElementMove() {
        return () => {
            const position = this.position;
            return this.elementMove(position);
        }
    }

    elementMove(position: PositionTracker) {
        const {
            gridX,
            gridY,
        } = position;
        this.element?.transform(`T${gridX * this.gridSize},${gridY * this.gridSize}`);
    }
}
import "snapsvg-cjs";
import { EditorCursor } from "./Cursor";
import { PositionTracker } from "./PositionTracker";

interface CursorProps {
    snap: Snap.Paper;
    position: PositionTracker;
    buildingName: string;
    gridSize: number;
    getHighlighter: () => string;
}

export class CreateCursor implements EditorCursor {
    snap: Snap.Paper;
    position: PositionTracker;
    buildingName: string;
    element: Snap.Element | null;
    gridSize: number;
    isRotated: boolean;
    getHighlighter: () => string;
    
    constructor({
        snap,
        position,
        buildingName,
        gridSize,
        getHighlighter,
    }: CursorProps) {
        this.snap = snap;
        this.position = position;
        this.buildingName = buildingName;
        this.gridSize = gridSize;
        this.element = null;
        this.isRotated = false;
        this.getHighlighter = getHighlighter;
        this.actionCreate();
    }

    destroy() {
        this.snap.unmousemove(this.getElementMove());
        this.element?.remove();
        this.snap.unmouseup();
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

    rotate() {
        if (this.isRotated) {
            this.buildingName = this.buildingName.replace("_rotated", "");
        }
        else {
            this.buildingName = `${this.buildingName}_rotated`;
        }
        this.isRotated = !this.isRotated;
        this.destroy();
        this.actionCreate();
    }

    getElementMouseUp() {
        return (event: MouseEvent) => {
            if (event.ctrlKey) {
                this.rotate();
            }
            else {
                const element = this.element;
                return this.elementMouseUp(element);
            }
        };
    }

    elementMouseUp(element: Snap.Element | null) {
        const cur = element?.clone();
        cur?.insertBefore(this.element!);
        cur?.attr({
            opacity: "",
            placed: true,
        });
        cur?.hover(() => {
            cur.toggleClass("highlight", true);
            cur.toggleClass(this.getHighlighter(), true);
        }, () => {
            cur.toggleClass("highlight", false);
            cur.toggleClass(this.getHighlighter(), false);
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
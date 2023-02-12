import "snapsvg-cjs";
import { PositionTracker } from "./PositionTracker";

interface CursorProps {
    snap: Snap.Paper;
    action: Action;
    position: PositionTracker;
    buildingName: string;
    gridSize: number;
}

export interface EditorCursor {
    destroy: () => void;
}

export enum Action {
    Create,
    Select,
    Delete,
}
export class Cursor implements EditorCursor {
    snap: Snap.Paper;
    action: Action;
    position: PositionTracker;
    buildingName: string;
    element: Snap.Element | null;
    gridSize: number;
    isSelectDeleteMode: boolean;
    isRotated: boolean;
    
    constructor({
        snap,
        action,
        position,
        buildingName,
        gridSize,
    }: CursorProps) {
        this.snap = snap;
        this.position = position;
        this.buildingName = buildingName;
        this.gridSize = gridSize;
        this.element = null;
        this.action = action;
        this.isRotated = false;
        this.isSelectDeleteMode = true;
        
        switch (action) {
            case Action.Select:
                this.actionSelect();
                break;
            case Action.Delete:
                this.actionDelete();
                break;
            case Action.Create:
                this.actionCreate();
                break;
        }
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

    actionDelete() {
        this.snap.mouseup(event => {
            const elem = this.position.getUseElementFromMouseEvent(event);
            elem?.remove();
        });
    }

    actionSelect() {
        this.element?.remove();
        this.snap.unmouseup();
        if (this.isSelectDeleteMode) {
            this.actionSelectDelete();
        }else {
            this.actionSelectCreate();
        }
    }

    actionSelectDelete() {
        this.snap.mouseup(event => {
            const elem = this.position.getUseElementFromMouseEvent(event);
            if (elem) {
                this.buildingName = elem.attr("href").replace("#", "");
                elem.remove();
                this.isSelectDeleteMode = false;
                this.actionSelect();
            } 
        });
    }

    actionSelectCreate() {
        this.element = this.snap.use(this.buildingName) as Snap.Element;
        this.element.attr({
            opacity: 0.5,
        });

        this.elementMove(this.position);
        this.snap.mousemove(this.getElementMove());
        this.snap.mouseup(() => {
            this.elementMouseUp(this.element);
            this.isSelectDeleteMode = true;
            this.actionSelect();
        });
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
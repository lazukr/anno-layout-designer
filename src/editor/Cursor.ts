import "snapsvg-cjs";
import { getBuildingById } from "../data/Series";
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
    static action: Action;
    snap: Snap.Paper;
    position: PositionTracker;
    buildingName: string;
    element: Snap.Element | null;
    dragElement: Snap.Element | null;
    gridSize: number;
    isSelectDeleteMode: boolean;
    isRotated: boolean;
    drag: boolean;
    frozenX: number;
    frozenY: number;
    
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
        this.dragElement = null;
        Cursor.action = action;
        this.isRotated = false;
        this.isSelectDeleteMode = true;
        this.drag = false;
        this.frozenX = position.gridX;
        this.frozenY = position.gridY;
    
        switch (Cursor.action) {
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
        this.snap.unmousedown();
    }

    actionCreate() {
        this.element = this.snap.use(this.buildingName) as Snap.Element;
        this.element.attr({
            opacity: 0.5,
        });

        this.elementMove(this.position);
        this.snap.mousemove(this.getElementMove());
        this.snap.mousedown(this.getElementMouseDown());
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

    getHighlightColour() {
        if (Cursor.action === Action.Delete) {
            return "delete";
        }
        else {
            return "select";
        }
    }

    getElementMouseDown() {
        return (event: MouseEvent) => {
            this.drag = true;
            const {
                width,
                height,
            } = getBuildingById(this.buildingName);
            const {
                gridX,
                gridY,
            } = this.position;
            this.frozenX = gridX;
            this.frozenY = gridY;

            this.dragElement = this.snap.rect(gridX * this.gridSize, gridY * this.gridSize, width * this.gridSize, height * this.gridSize);
            const clone = this.element?.clone();
            clone?.attr({
                
            });
            const pattern = clone?.toPattern(gridX * this.gridSize, gridY * this.gridSize, width * this.gridSize, height * this.gridSize);
            this.dragElement.attr({
                opacity: 0.5,
                fill: pattern,
            });
            this.element?.attr({
                visibility: "hidden",
            });
        };
    }

    elementMouseUp(element: Snap.Element | null) {
        this.drag = false;
        this.element?.attr({
            visibility: "",
        });

        const {
            gridX,
            gridY,
        } = this.position;


        if (gridX === this.frozenX &&
            gridY === this.frozenY) {

            const cur = element?.clone();
            cur?.insertBefore(this.element!);
            cur?.attr({
                opacity: "",
                placed: true,
            });
    
            cur?.hover(() => {
                cur.toggleClass("highlight", true);
                cur.toggleClass(this.getHighlightColour(), true);
            }, () => {
                cur.toggleClass("highlight", false);
                cur.toggleClass(this.getHighlightColour(), false);
            });
        }
        else {

        }
    }

    getElementMove() {
        return () => {
            const position = this.position;
            if (this.drag) {
                const {
                    gridX,
                    gridY,
                } = position;

                this.dragElement?.attr({
                    width: (gridX - this.frozenX + 1) * this.gridSize,
                    height: (gridY - this.frozenY + 1) * this.gridSize,
                });
            }
            else {
                return this.elementMove(position);
            }
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
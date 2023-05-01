import { Svg, Use } from "@svgdotjs/svg.js";
import { PositionTracker } from "./PositionTracker";
interface CursorProps {
    svg: Svg;
    action: Action;
    positionTracker: PositionTracker;
    buildingName: string;
    gridSize: number;
    getHighlight: () => string;
}

export enum Action {
    Create,
    Select,
    Delete,
}
export class Cursor {
    static action: Action;
    svg: Svg;
    positionTracker: PositionTracker;
    buildingName: string;
    element?: Use;
    gridSize: number;
    isSelectDeleteMode: boolean;
    isRotated: boolean;
    getHighlight: () => string;
    
    constructor({
        svg,
        action,
        positionTracker,
        buildingName,
        gridSize,
        getHighlight,
    }: CursorProps) {
        this.svg = svg;
        this.positionTracker = positionTracker;
        this.buildingName = buildingName;
        this.gridSize = gridSize;
        Cursor.action = action;
        this.isRotated = false;
        this.isSelectDeleteMode = true;
        this.getHighlight = getHighlight;
        this.destroy();

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
        this.svg.mousemove(null);
        this.element?.remove();
        this.svg.mouseup(null);
    }

    actionCreate() {
        this.element = this.svg.use(this.buildingName);
        this.element.attr({
            opacity: 0.5,
        });

        this.positionTracker.attachMouseMove(this.element, this.gridSize);
        this.svg.mouseup(this.getElementMouseUp());
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
        this.svg.mouseup((event: MouseEvent) => {
            const elem = this.positionTracker.getUseElementFromMouseEvent(event);
            elem?.remove();
        });
    }

    actionSelect() {
        this.element?.remove();
        this.svg.mouseup(null);
        if (this.isSelectDeleteMode) {
            this.actionSelectDelete();
        }else {
            this.actionSelectCreate();
        }
    }

    actionSelectDelete() {
        this.svg.mouseup((event: MouseEvent) => {
            const elem = this.positionTracker.getUseElementFromMouseEvent(event);

            if (elem !== null) {
                this.buildingName = elem.attr("href").replace("#", "");
                elem.remove();
                this.isSelectDeleteMode = false;
                this.actionSelect();
            }
        });
    }

    actionSelectCreate() {
        this.element = this.svg.use(this.buildingName);
        this.element.attr({
            opacity: 0.5,
        });

        this.positionTracker.attachMouseMove(this.element, this.gridSize);        
        this.svg.mouseup(() => {
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

    elementMouseUp(element?: Use) {
        const cur = element?.clone();        
        cur?.insertBefore(this.element!);
        cur?.attr({
            opacity: "",
        });
        cur?.addClass("placed");
        cur?.on("mouseover", () => {
            cur.toggleClass("highlight");
            cur.toggleClass(this.getHighlight());
        });

        cur?.on("mouseout", () => {
            cur.removeClass("highlight");
            cur.removeClass(this.getHighlight());
        });
    }
}
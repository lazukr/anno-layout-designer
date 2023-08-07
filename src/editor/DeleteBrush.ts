import { Rect } from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import { GRID_SIZE } from "./SvgCanvas";
import { Brush, DraggableBrush, getBrush, overlaps } from "./Brush";
import { Cursor } from "./Cursor";

export enum DeleteMode {
    Select,
    Delete,
};

export class DeleteBrush implements Brush, DraggableBrush {
    rect: Rect;
    frozen: boolean;

    constructor(svg: Svg, cursor: Cursor, mode: DeleteMode = DeleteMode.Delete) {
        this.frozen = false;

        this.rect = getBrush(svg, GRID_SIZE, GRID_SIZE);
        this.rect.attr({
            opacity: 0.5,
            fill: mode === DeleteMode.Delete ? "red" : "green",
        });

        cursor.attachMouseMove(this);
        cursor.attachMouseUp(this);
        cursor.attachCreateDrag(this);
    }

    move(x: number, y: number) {
        if (this.frozen) {
            return;
        }
        this.rect.move(x, y);
    }

    mouseUpAction(svg: Svg) {
        const overlappingElements = svg
            .find("use.placed")
            .filter(element => overlaps(this.rect, element));

        for (var element of overlappingElements) {
            element.remove();
        };

        return overlappingElements;
    }

    remove() {
        this.rect.draggable(false);
        this.rect.remove();
    }
}
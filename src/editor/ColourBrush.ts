import { Rect } from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import { GRID_SIZE } from "./SvgCanvas";
import { Brush, DraggableBrush, getBrush, overlaps } from "./Brush";
import { Cursor } from "./Cursor";

export class ColourBrush implements Brush, DraggableBrush {
    rect: Rect;
    frozen: boolean;
    colour: string;

    constructor(svg: Svg, cursor: Cursor, colour: string) {
        this.frozen = false;
        this.colour = colour;

        this.rect = getBrush(svg, GRID_SIZE, GRID_SIZE);
        this.rect.attr({
            opacity: 0.5,
            fill: this.colour,
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
            element.fill({
                color: this.colour,
                opacity: 1,
            });
        };

        return overlappingElements;
    }

    remove() {
        this.rect.draggable(false);
        this.rect.remove();
    }
}
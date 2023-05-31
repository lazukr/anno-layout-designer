import { Rect } from "@svgdotjs/svg.js";
import { Brush } from "./Brush";
import { Svg } from "@svgdotjs/svg.js";
import { BrushData } from "./BrushData";
import { GRID_SIZE } from "./SvgCanvas";
import { Element as DotSVGElement } from "@svgdotjs/svg.js";
import { Box } from "@svgdotjs/svg.js";

export class DeleteBrush implements Brush {
    rect: Rect;
    frozen: boolean;

    constructor(svg: Svg) {
        this.frozen = false;

        this.rect = svg.rect(GRID_SIZE, GRID_SIZE);
        this.rect.attr({
            opacity: 0.5,
            fill: "red",
        });
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

const overlaps = (rect: Rect, element: DotSVGElement): boolean => {
    const {
        x,
        y,
        width,
        height,
    } = rect.bbox();

    // offset to ensure we don't delete both items if they're on the line
    return element.inside(x + 1, y + 1) ||
        element.inside(x + width - 1, y + 1) ||
        element.inside(x + 1, y + height - 1) ||
        element.inside(x + width - 1, y + height - 1);
};
import { Rect } from "@svgdotjs/svg.js";
import { Svg } from "@svgdotjs/svg.js";
import { Element as DotSVGElement } from "@svgdotjs/svg.js";

export interface DraggableBrush {
    rect: Rect;
    frozen: boolean;
}

export interface Brush {
    remove: () => void;
    move: (x: number, y: number) => void;
    mouseUpAction: (svg: Svg) => DotSVGElement[];
}

export const overlaps = (rect: Rect, element: DotSVGElement): boolean => {
    const {
        x,
        y,
        width,
        height,
    } = element.bbox();

    const {
        x: rx,
        y: ry,
        width: rwidth,
        height: rheight,
    } = rect.bbox();

    // check if it won't collide and flip it
    const notCollide = 
        rx + 1 > x + width ||
        rx + rwidth - 1 < x ||
        ry + 1 > y + height ||
        ry + rheight - 1 < y;

    return !notCollide;
};

export const isDraggableBrush = (object: any): object is DraggableBrush => {
    return true;
}

export const getBrush = (svg: Svg, width: number, height: number) => {
    const brush = svg.rect(width, height);
    brush.addClass("cursor");
    return brush;
}
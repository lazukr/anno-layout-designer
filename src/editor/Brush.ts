import { Rect } from "@svgdotjs/svg.js";
import { BrushData } from "./BrushData";
import { Action } from "./action";
import { CreateBrush } from "./CreateBrush";
import { Svg } from "@svgdotjs/svg.js";
import { DeleteBrush } from "./DeleteBrush";

export interface Brush {
    remove: () => void;
    move: (x: number, y: number) => void;
    mouseUpAction: (svg: Svg) => void;
    rect: Rect;
    frozen: boolean;
}

export const getBrush = (svg: Svg, action: Action, buildingName: string): Brush => {
    switch (action) {
        case Action.Create:
            return new CreateBrush(svg, buildingName);
        case Action.Delete:
        case Action.Select:
            return new DeleteBrush(svg);
    }
}
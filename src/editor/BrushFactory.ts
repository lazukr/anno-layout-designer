import { Svg } from "@svgdotjs/svg.js";
import { Cursor } from "./Cursor";
import { Action } from "./action";
import { CreateBrush } from "./CreateBrush";
import { DeleteBrush } from "./DeleteBrush";
import { SelectBrush } from "./SelectBrush";
import { ColourBrush } from "./ColourBrush";

export const getBrushFromFactory = (action: Action, svg: Svg, cursor: Cursor, buildingName: string, colour: string) => {
    switch (action) {
        case Action.Create:
            return new CreateBrush(svg, cursor, buildingName);
        case Action.Delete:
            return new DeleteBrush(svg, cursor);
        case Action.Select:
            return new SelectBrush(svg, cursor);
        case Action.Colour:
            return new ColourBrush(svg, cursor, colour);
        default:
            throw new TypeError(`Case ${action} not defined.`);
    }
}
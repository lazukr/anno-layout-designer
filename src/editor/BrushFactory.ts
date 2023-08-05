import { Svg } from "@svgdotjs/svg.js";
import { Cursor } from "./Cursor";
import { Action } from "./action";
import { CreateBrush } from "./CreateBrush";
import { DeleteBrush } from "./DeleteBrush";
import { SelectBrush } from "./SelectBrush";

export const getBrushFromFactory = (action: Action, svg: Svg, cursor: Cursor, buildingName: string) => {
    switch (action) {
        case Action.Create:
            return new CreateBrush(svg, cursor, buildingName);
        case Action.Delete:
            return new DeleteBrush(svg, cursor);
        case Action.Select:
            return new SelectBrush(svg, cursor);
        default:
            throw new TypeError(`Case ${action} not defined.`);
    }
}
import { Svg } from "@svgdotjs/svg.js";
import { Brush } from "./Brush";
import { G } from "@svgdotjs/svg.js";
import { BrushData } from "./BrushData";
import { Cursor } from "./Cursor";

export class PlaceBrush implements Brush {
    group: G;

    constructor(cursor: Cursor, group: G) {
        this.group = group;
        cursor.attachMouseMove(this);
        cursor.attachMouseUp(this);
    }

    move(x: number, y: number) {
        this.group.move(x, y);
    }

    mouseUpAction(svg: Svg) {
        const brushData = this.getBrushData();
        for (const element of brushData) {
            const use = svg.use(element.buildingName).before(this.group);
            use.addClass("placed");
            use.move(element.x, element.y);
        }

        return [];
    }

    getBrushData(): BrushData[] {
        const list = this.group.children();
        return list.map(item => {
            return {
                buildingName: item.attr("href").replace("#", ""),
                x: item.x() as number,
                y: item.y() as number,
            }
        });
    }

    remove() {
        this.group.remove();
    }
}
import { Use } from "@svgdotjs/svg.js";
import { Rect } from "@svgdotjs/svg.js";
import { Brush } from "./Brush";
import { Svg } from "@svgdotjs/svg.js";
import { Pattern } from "@svgdotjs/svg.js";
import { BrushData } from "./BrushData";

export class CreateBrush implements Brush {
    rect: Rect;
    pattern: Pattern;
    frozen: boolean;
    buildingName: string;

    constructor(svg: Svg, buildingName: string) {
        this.frozen = false;
        this.buildingName = buildingName;

        // get use element
        const use = svg.use(buildingName);
        const {
            width,
            height,
        } = use.bbox();

        this.rect = svg.rect(width, height);
        this.rect.attr({
            opacity: 0.5,
        });

        this.pattern = svg.pattern(width, height, (add) => {
            add.use(use.attr("href").replace("#", ""))
        });
        this.rect.fill(this.pattern);
        use.remove();
    }

    move(x: number, y: number) {
        if (this.frozen) {
            return;
        }
        this.pattern.move(x, y);
        this.rect.move(x, y);
    }

    mouseUpAction(svg: Svg) {
        const brushData = this.getBrushData();
        for (const item of brushData) {
            const use = svg.use(item.buildingName).before(this.rect);
            use.addClass("placed");
            use.move(item.x, item.y);
        }
    }

    getBrushData(): BrushData[] {
        const {
            x,
            y,
            width,
            height,
        } = this.rect.bbox();

        const elemWidth = this.pattern.width() as number;
        const elemHeight = this.pattern.height() as number;

        const brushData = [];

        for (let i = x; i < width + x; i += elemWidth) {
            for (let j = y; j < height + y; j += elemHeight) {
                brushData.push({
                    buildingName: this.buildingName,
                    x: i,
                    y: j,
                });
            }
        }
        return brushData;
    }

    remove() {
        this.rect.draggable(false);
        this.rect.remove();
    }
}
import { Svg } from "@svgdotjs/svg.js";
import { Brush } from "./Brush";
import { DeleteBrush, DeleteMode } from "./DeleteBrush";
import { Cursor } from "./Cursor";
import { PlaceBrush } from "./PlaceBrush";


export enum SelectMode {
    Select,
    Place,
};

export class SelectBrush implements Brush {
    mode: SelectMode;
    internalBrush: Brush;
    cursor: Cursor;

    constructor(svg: Svg, cursor: Cursor) {
        this.mode = SelectMode.Select;
        this.cursor = cursor;
        this.internalBrush = new DeleteBrush(svg, cursor, DeleteMode.Select);
        cursor.attachMouseMove(this);
        cursor.attachMouseUp(this);
    }

    move(x: number, y: number) {
        this.internalBrush.move(x, y);
    }

    mouseUpAction(svg: Svg) {
        const result = this.internalBrush.mouseUpAction(svg);

        if (this.mode === SelectMode.Select) {
            // nothing selected
            if (result.length === 0) {
                return [];
            }

            this.internalBrush.remove();
            const group = svg.group();
            group.addClass("cursor");
            for (const element of result) {
                element.attr({
                    opacity: 0.5,
                });
                group.add(element);
            }

            this.internalBrush = new PlaceBrush(this.cursor, group);
            this.mode = SelectMode.Place;
        }
        else {
            
            this.internalBrush.remove();
            this.internalBrush = new DeleteBrush(svg, this.cursor, DeleteMode.Select);
            this.mode = SelectMode.Select;
        }

        this.cursor.attachMouseMove(this);
        this.cursor.attachMouseUp(this);
        return [];
    }

    remove() {
        this.internalBrush.remove();
    }
    
}
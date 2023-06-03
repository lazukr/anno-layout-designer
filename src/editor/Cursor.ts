import { Svg } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import { Brush, DraggableBrush } from "./Brush";


export class Cursor {
    private svg: Svg;
    private svgElement: SVGSVGElement;
    private gridSize: number;
    private x: number;
    private y: number;

    constructor(svg: Svg, gridSize: number) {
        this.x = 0;
        this.y = 0;
        this.svg = svg;
        this.svgElement = svg.node;
        this.gridSize = gridSize;
    }

    attachMouseMove(brush: Brush) {
        this.svg.mousemove(null);

        const move = () => {
            const gridX = this.x - (this.x % this.gridSize);
            const gridY = this.y - (this.y % this.gridSize);
            brush.move(gridX, gridY);
        };

        move();
        this.svg.mousemove((event: MouseEvent) => {
            const bound = this.svgElement.getBoundingClientRect();
            this.x = event.clientX - bound.left;
            this.y = event.clientY - bound.top;
            move();
        });
    }

    attachCreateDrag(brush: DraggableBrush) {
        const rect = brush.rect;
        rect.draggable();
        
        const {
            width,
            height,
        } = rect.bbox();
        
        rect.on('dragstart', e => {
            brush.frozen = true;
        });

        rect.on('dragmove', (e) => {
            e.preventDefault();
            const ce = e as CustomEvent;
            const {x, y} = ce.detail.box;
            const widthX = x - (rect.x() as number);
            const heightY = y - (rect.y() as number);
            rect.size(width + Math.max(widthX - (widthX % width), 0), height + Math.max(heightY - (heightY % height), 0));
          });

        rect.on('dragend', (e) => {
            e.preventDefault();
            brush.frozen = false;
            rect.size(width, height);
        });
    }

    attachMouseUp(brush: Brush) {
        this.svg.mouseup(null);
        this.svg.mouseup(() => {
            brush.mouseUpAction(this.svg);
        });
    }
}
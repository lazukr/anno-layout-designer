import { Svg } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import { Brush } from "./Brush";


export class PositionTracker {
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

    attachCreateDrag(brush: Brush) {
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
            const widthY = y - (rect.y() as number);
            rect.size(width + Math.max(widthX - (widthX % width), 0), height + Math.max(widthY - (widthY % height), 0));
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


/*
export class PositionTracker {
    private svg: Svg;
    private svgElement: SVGSVGElement;
    private createRect?: Rect;
    private frozen: boolean;

    gridX: number;
    gridY: number;

    constructor(svg: Svg) {
        this.svg = svg;
        this.svgElement = this.svg.node;
        this.gridX = 0;
        this.gridY = 0;
        this.frozen = false;
    }

    attachMouseMove(use: Use, gridSize: number) {

        const doMove = () => {
            if (this.frozen) {
                return;
            }
            use.move(this.gridX * gridSize, this.gridY * gridSize);
        }

        // move it to current location
        doMove();

        // attach listener for future movement
        this.svg.mousemove((event: MouseEvent) => {
            const bound = this.svgElement.getBoundingClientRect();
            const x = event.clientX - bound.left;
            const y = event.clientY - bound.top;

            this.gridX = (x - (x % gridSize)) / gridSize;
            this.gridY = (y - (y % gridSize)) / gridSize;
            doMove();
        });
    }

    attachUseDrag(use: Use, gridSize: number) {
        use.draggable();
        
        const {
            width,
            height,
        } = use.bbox();
        
        use.on('beforedrag', e => {
            this.frozen = true;
            const {
                x,
                y,
            } = use.bbox();

            this.createRect = this.svg.rect(width, height);
            this.createRect.move(x, y);
            this.createRect.attr(use.attr());

            const pattern = this.svg.pattern(width, height, (add) => {
                add
                    .use(use.attr("href").replace("#", ""))
            }).move(x, y);
            this.createRect.fill(pattern);
            use.hide();
          });

        use.on('dragmove', (e) => {
            e.preventDefault();
            const ce = e as CustomEvent;
            const {x, y} = ce.detail.box;
            this.createRect?.size(Math.max(x - (x % width) + width, width), Math.max(y - (y % height) + height, height));
          });

        use.on('dragend', (e) => {
            e.preventDefault();
            use.show();
            this.frozen = false;
            this.createRect?.remove();
            this.createRect = undefined;
        });
    }

    getUseElementFromMouseEvent(event: MouseEvent) {
        const target = event.target as SVGSVGElement;
        const use = new Svg(target);

        if (use.type === "use") {
            return use as Use;
        }

        return null;
    }

    getCreateRect() {
        return this.createRect;
    }
}
*/

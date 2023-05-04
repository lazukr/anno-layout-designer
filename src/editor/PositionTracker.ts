import { Svg, Use } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";
import { Rect } from "@svgdotjs/svg.js";
export class PositionTracker {
    private svg: Svg;
    private svgElement: SVGGraphicsElement;
    private createRect?: Rect;
    private frozen: boolean;

    gridX: number;
    gridY: number;

    constructor(svg: Svg) {
        this.svg = svg;
        this.svgElement = document.querySelector(`#${this.svg.node.id}`) as SVGGraphicsElement;
        this.gridX = 0;
        this.gridY = 0;
        this.frozen = false;
    }

    attachMouseMove(use: Use, gridSize: number) {
        // move it to current location
        use.move(this.gridX * gridSize, this.gridY * gridSize);

        const doMove = () => {
            if (this.frozen) {
                return;
            }
            use.move(this.gridX * gridSize, this.gridY * gridSize);
        }

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
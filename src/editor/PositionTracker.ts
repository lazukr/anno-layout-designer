import { Svg, Use } from "@svgdotjs/svg.js";
export class PositionTracker {
    private svg: Svg;
    private svgElement: SVGGraphicsElement;
    gridX: number;
    gridY: number;

    constructor(svg: Svg) {
        this.svg = svg;
        this.svgElement = document.querySelector(`#${this.svg.node.id}`) as SVGGraphicsElement;
        this.gridX = 0;
        this.gridY = 0;
    }

    attachMouseMove(use: Use, gridSize: number) {
        // move it to current location
        use.move(this.gridX * gridSize, this.gridY * gridSize);

        // attach listener for future movement
        this.svg.mousemove((event: MouseEvent) => {
            const bound = this.svgElement.getBoundingClientRect();
            this.gridX = Math.floor((event.clientX - bound.left) / gridSize);
            this.gridY = Math.floor((event.clientY - bound.top) / gridSize);
            use.move(this.gridX * gridSize, this.gridY * gridSize);
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
}
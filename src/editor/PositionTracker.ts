import "snapsvg-cjs";
import SNAPSVG_TYPE from "snapsvg";

declare const Snap: typeof SNAPSVG_TYPE;
interface PositionTrackerProps {
    snap: Snap.Paper;
    gridSize: number;
}

export class PositionTracker {
    private snap: Snap.Paper;
    private gridSize: number;
    gridX: number;
    gridY: number;

    constructor({
        snap,
        gridSize,
    }: PositionTrackerProps) {
        this.snap = snap;
        this.gridSize = gridSize;
        this.gridX = 0;
        this.gridY = 0;
        this.attachMouseMove();
    }

    private attachMouseMove() {
        this.snap.mousemove(event => {
            const svgElement = document.querySelector(`#${this.snap.node.id}`) as SVGGraphicsElement;
            const bound = svgElement.getBoundingClientRect();
            this.gridX = Math.floor((event.clientX - bound.left) / this.gridSize);
            this.gridY = Math.floor((event.clientY - bound.top) / this.gridSize);
        });
    }

    static getUseElementFromMouseEvent(event: MouseEvent) {
        const x = event.clientX;
        const y = event.clientY;
        const elem = Snap.getElementByPoint(x, y); 
        
        if (elem.type === "use") {
            return elem;
        }
        return null;
    }
}
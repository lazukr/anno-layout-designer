import "snapsvg-cjs";

interface PositionTrackerProps {
    snap: Snap.Paper;
    bound: DOMRect;
    gridSize: number;
}

export class PositionTracker {
    private snap: Snap.Paper;
    private bound: DOMRect;
    private gridSize: number;
    gridX: number;
    gridY: number;

    constructor({
        snap,
        bound,
        gridSize,
    }: PositionTrackerProps) {
        this.snap = snap;
        this.bound = bound;
        this.gridSize = gridSize;
        this.gridX = 0;
        this.gridY = 0;
        this.attachMouseMove();
        this.attachMouseDown();
    }

    private attachMouseMove() {
        this.snap.mousemove(event => {
            this.gridX = Math.floor((event.pageX - this.bound.left) / this.gridSize);
            this.gridY = Math.floor((event.pageY - this.bound.top) / this.gridSize);
        });
    }

    private attachMouseDown() {
        this.snap.mousedown(() => {
            console.log(this.gridX, this.gridY);
        });
    }
}
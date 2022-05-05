import "snapsvg-cjs";
import { BUILDINGS } from "../data/DataMapper"; 
import { GRID, IMAGE_PATH } from "../utils/Constants";
interface BuildingProps {
    dataId: string;
    snap: Snap.Paper;
    x: number;
    y: number;
    placementMode: boolean;
}

interface SpriteModelProps {
    id: string;
    snap: Snap.Paper;
}

export class Building {
    snap: Snap.Paper;
    dataId: string;
    set: Snap.Element;
    width: number;
    height: number;

    constructor({
        snap,
        dataId,
        x,
        y,
        placementMode,
    }: BuildingProps) {
        this.snap = snap;
        this.dataId = dataId;
        const info = BUILDINGS[dataId];
        this.width = info.width;
        this.height = info.height;
        this.set = this.snap.use(dataId) as Snap.Element;

        if (placementMode) {
            this.set.attr({
                opacity: 0.6,
            });
        }

        this.set.transform(`t${x * GRID.SIZE},${y * GRID.SIZE}`);
    }

    clear() {
        this.set.remove();
    }

    updatePosition(x: number, y: number) {
        this.set.transform(`t${x * GRID.SIZE},${y * GRID.SIZE}`);
    }

    static createSpriteModel = ({
        snap,
        id,
    }: SpriteModelProps) => {

        const {width, height } = BUILDINGS[id];
        const squareSize = Math.min(width, height) / 2;
        const centerX = width / 2 - squareSize / 2;
        const centerY = height / 2 - squareSize / 2;
        const background = snap.rect(
            0,
            0,
            width * GRID.SIZE, 
            height * GRID.SIZE)
            .attr({
                "fill-opacity": 0.6,
                stroke: "#000",
                strokeWidth: 5,
                "paint-order": "stroke"
            });

        const sprite = snap.image(
            `${IMAGE_PATH}${id}.png`,
            centerX * GRID.SIZE,
            centerY * GRID.SIZE,
            squareSize * GRID.SIZE,
            squareSize * GRID.SIZE,
        );
        const set = snap.g(...[background, sprite]);
        return set;
    }
}


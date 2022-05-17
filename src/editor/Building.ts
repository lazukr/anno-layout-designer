import "snapsvg-cjs";
import { BUILDINGS } from "../data/DataMapper"; 
import { GRID, IMAGE_PATH } from "../utils/Constants";
import {v4 as uuidv4 } from "uuid";
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
    bid: string;
    snap: Snap.Paper;
    dataId: string;
    set: Snap.Element;
    width: number;
    height: number;
    x: number;
    y: number;

    constructor({
        snap,
        dataId,
        x,
        y,
        placementMode,
    }: BuildingProps) {
        this.bid = uuidv4();
        this.snap = snap;
        this.dataId = dataId;
        const info = BUILDINGS[dataId];
        this.width = info.width;
        this.height = info.height;
        this.x = x;
        this.y = y;
        this.set = this.snap.use(dataId) as Snap.Element;
        this.set.attr({id: this.bid});

        if (placementMode) {
            this.set.attr({
                opacity: 0.6,
            });
        }

        this.updatePosition(x, y);
    }

    clear() {
        this.set.remove();
    }

    updatePosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.set.transform(`t${x * GRID.SIZE},${y * GRID.SIZE}`);
    }

    static clone(building: Building) {
        const {
            snap,
            dataId,
            x,
            y,
        } = building;

        return new Building({
            snap: snap,
            dataId: dataId,
            x: x,
            y: y,
            placementMode: false,
        });
    }
    
    static create = (snap: Snap.Paper, selection: string, x: number, y: number) => {
        return new Building({
            snap: snap,
            dataId: selection,
            x: x,
            y: y,
            placementMode: true,
        });
    }
    
    static createSpriteModel = ({
        snap,
        id,
    }: SpriteModelProps) => {

        const {width, height, colour } = BUILDINGS[id];
        const squareSize = Math.min(width, height) / 2;
        const centerX = width / 2 - squareSize / 2;
        const centerY = height / 2 - squareSize / 2;
        const background = snap.rect(
            0.5,
            0.5,
            width * GRID.SIZE - 1, 
            height * GRID.SIZE - 1)
            .attr({
                "fill-opacity": 1,
                stroke: "#000",
                fill: colour,
                strokeWidth: 2,
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


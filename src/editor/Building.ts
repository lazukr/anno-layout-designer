import "snapsvg-cjs";
import { SVGBuildingData } from "../data/BuildingData";
import { getAllBuildingData } from "../data/Series";
import Path from "path-browserify";

export const createAllBuildings = (snap: Snap.Paper, gridSize: number) => {
    const buildings = getAllBuildingData();
    buildings.forEach(building => {
        createBuilding(snap, building, gridSize, true);
        createBuilding(snap, building, gridSize, false);
    });
    bakeBuildingsToSVG(snap);
}

const bakeBuildingsToSVG = (snap: Snap.Paper) => {
    const images = snap.selectAll("image");
    images.forEach(image => {
        const {
            width,
            height,
        } = image.getBBox();

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext("2d");
            context?.drawImage(img, 0, 0, width, height);
            image.attr({
                href: canvas.toDataURL(),
            });
        }
        img.src = image.attr("href");
    });
}

const createBuilding = (snap: Snap.Paper, building: SVGBuildingData, gridSize: number, rotated: boolean) => {
    const {
        width,
        height,
        colour,
        id,
    } = building;

    const trueWidth = rotated ? height : width;
    const trueHeight = rotated ? width : height;
    const area = trueWidth * trueHeight;
    const squareSize = area > 1 ? Math.min(trueWidth, trueHeight) / 2 : 1;
    const centerX = trueWidth / 2 - squareSize / 2;
    const centerY = trueHeight / 2 - squareSize / 2;
    
    const background = snap
        .rect(0.25, 0.25, trueWidth * gridSize - 0.5, trueHeight * gridSize - 0.5)
        .attr({
            fill: colour,
        });

    const sprite = snap.image(
        Path.join(process.env.PUBLIC_URL, building.imagePath),
        centerX * gridSize,
        centerY * gridSize,
        squareSize * gridSize,
        squareSize * gridSize,
    );

    const model = snap.g(...[background, sprite])
        .attr({
            id: rotated ? `${id}_rotated` : id,
        });

    model.toDefs();
}
import "snapsvg-cjs";
import { BuildingData } from "../data/BuildingData";
import { getAllBuildingData } from "../data/Series";
import Path from "path-browserify";

export const createAllBuildings = (snap: Snap.Paper, gridSize: number) => {
    const buildings = getAllBuildingData();
    buildings.forEach(building => {
        createBuilding(snap, building, gridSize);
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

const createBuilding = (snap: Snap.Paper, building: BuildingData, gridSize: number) => {
    const {
        width,
        height,
        colour,
        name,
    } = building;

    const area = width * height;
    const squareSize = area > 1 ? Math.min(width, height) / 2 : 1;
    const centerX = width / 2 - squareSize / 2;
    const centerY = height / 2 - squareSize / 2;
    
    const background = snap
        .rect(0.25, 0.25, width * gridSize - 0.5, height * gridSize - 0.5)
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
            id: name,
        });

    model.toDefs();
}

/*
colour schemes
resident - cccc00
materials - dddd88
goods - ffff88

- worker - grey? => 
- artisan - red => 
- engineer - blue => 
- investor - green => 
- jornaleros - orange => 
- obreros - purple => 
- 



*/
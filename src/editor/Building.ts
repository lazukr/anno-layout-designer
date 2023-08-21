import { SVGBuilding } from "../data/Building";
import { getAllBuildingData } from "../data/Series";
import Path from "path-browserify";
import { Element as DotSVGElement, Svg } from "@svgdotjs/svg.js";

export const createAllBuildings = (svg: Svg, gridSize: number) => {
    const buildings = getAllBuildingData();
    buildings.forEach(building => {
        createBuilding(svg, building, gridSize, true);
        createBuilding(svg, building, gridSize, false);
    });
}

const replaceImage = async (image: DotSVGElement) => {
    const {
        width,
        height,
    } = image.bbox();

    const img = new Image();
    img.src = image.attr("href");
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context?.drawImage(img, 0, 0, width, height);
    image.attr({
        href: canvas.toDataURL(),
    });
}

export const bakeBuildingsToSVG = async (svg: Svg) => {
    const images = svg.find("image");
    const promises = [];

    for (let i = 0; i < images.length; i++) {
        promises.push(replaceImage(images[i]));
    }

    await Promise.all(promises);
};

const createBuilding = (svg: Svg, building: SVGBuilding, gridSize: number, rotated: boolean) => {
    const {
        width,
        height,
        colour,
        id,
        ignoreImage,
    } = building;

    const trueWidth = rotated ? height : width;
    const trueHeight = rotated ? width : height;
    const area = trueWidth * trueHeight;
    const squareSize = area > 1 ? Math.min(trueWidth, trueHeight) / 2 : 1;
    const centerX = trueWidth / 2 - squareSize / 2;
    const centerY = trueHeight / 2 - squareSize / 2;
    
    const background = svg
        .rect(trueWidth * gridSize, trueHeight * gridSize);

    if (colour !== undefined) {
        background.fill(colour);
    }

    const model = svg
        .defs()
        .group()
        .add(background);

    if (!ignoreImage) {
        const sprite = svg
        .image(Path.join(process.env.PUBLIC_URL, building.imagePath))
        .size(squareSize * gridSize, squareSize * gridSize)
        .move(centerX * gridSize, centerY * gridSize)
        .attr({
            id: rotated ? `image_${id}_rotated` : `image_${id}`, 
        });
        model.add(sprite);
    }
        
    model.attr({
            id: rotated ? `${id}_rotated` : id,
            width: trueWidth * gridSize,
            height: trueWidth * gridSize,
        });

    model.defs();
}
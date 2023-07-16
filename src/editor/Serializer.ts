import { Element as DotSVGElement, List, Svg, SVG } from "@svgdotjs/svg.js";
import { Buffer } from "buffer";
import { GRID_SIZE, SvgCanvas } from "./SvgCanvas";
import { bakeBuildingsToSVG } from "./Building";
import { BrushData } from "./BrushData";
import { CreateBrush } from "./CreateBrush";

const save = (name: string, blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
};

export interface SerializedData {
    width: number;
    height: number;
    data: BrushData[];
};

export const importSerializedBuildings = (serial: SerializedData) => {

    const {
        width,
        height,
        data,
    } = serial;

    SvgCanvas.setBoard(width, height);
    const svg = SvgCanvas.GetSVG();
    data.forEach(building => {
        building.x = building.x * GRID_SIZE;
        building.y = building.y * GRID_SIZE;
        CreateBrush.createBuilding(svg, building);
    });
}

export const saveAsJSONBase64 = async () => {
    const svg = SvgCanvas.GetSVG();
    const uses = svg.find("use.placed");
    const json = uses.map(e => {
        return {
            x: (e.x() as number) / GRID_SIZE,
            y: (e.y() as number) / GRID_SIZE,
            buildingName: (e.attr("href") as string).replace("#", ""),
        } as BrushData;
    });

    const save = {
        width: (svg.width() as number) / GRID_SIZE,
        height: (svg.height() as number) / GRID_SIZE,
        data: json,
    } as SerializedData;

    const data = JSON.stringify(save);
    const encoded = Buffer.from(data, "utf8").toString("base64");
    return encoded;
};

export const loadFromJSONBase64 = (load: string) => {
    try {
        const decoded = Buffer.from(load, "base64").toString("utf-8");
        const data = JSON.parse(decoded);
        return data as SerializedData;
    } catch {
        return undefined;
    }
};

const downloadFromCanvas = (canvas: HTMLCanvasElement) => {
    canvas.toBlob(blob => {
        save("anno-layout.png", blob!);
    });
};

const removeCursor = (useList: List<DotSVGElement>) => {
    useList.forEach(use => {
        if (use.hasClass("placed") === false) {
            use.remove();
        }
    });
};

const addRectBorders = (rectList: List<DotSVGElement>) => {
    rectList.forEach(rect => {
        rect.stroke({
            color: "black",
            width: 1,
        });
    });
};


export const saveAsPNG = async () => {
    const svg = SvgCanvas.GetSVG();

    // can replace with svg.clone(deep: true, assignNewIds: false); in a future version
    const clone = SVG(svg.node.cloneNode(true)) as Svg;

    // bake the images into the svg
    await bakeBuildingsToSVG(clone);

    // add rect borders
    const rects = clone.find("rect");
    addRectBorders(rects);

    // remove cursor
    const uses = clone.find("use");
    removeCursor(uses);

    const data = clone.svg();

    const image = new Image();
    image.onload = () => {
        const {
            width,
            height,
        } = svg.bbox();

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context!.drawImage(image, 0, 0);
        downloadFromCanvas(canvas);
    }
    image.src = `data:image/svg+xml,${encodeURIComponent(data)}`;
};

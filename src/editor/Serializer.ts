import { Element as DotSVGElement, List, Svg, SVG } from "@svgdotjs/svg.js";
import { GRID_SIZE, SnapCanvas } from "./SnapCanvas";
import { bakeBuildingsToSVG } from "./Building";

const save = (name: string, blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
};

export const saveAsSVG = async () => {
    const svg = SnapCanvas.GetCurrentSVG();
    const uses = svg.find("use.placed");
    const json = uses.map(e => {
        return {
            x: (e.x() as number) / GRID_SIZE,
            y: (e.y() as number) / GRID_SIZE,
            id: e.attr("href"),
        };
    });

    const data = JSON.stringify(json);
    const blob = new Blob([data], {
        type: "text/plain",
    });
    save("layout.json", blob);
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
    const svg = SnapCanvas.GetCurrentSVG();

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

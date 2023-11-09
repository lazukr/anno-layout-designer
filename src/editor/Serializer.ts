import { Buffer } from "buffer";
import { BuildingData } from "../stores/placementSlice";
export interface SerializedData {
	width: number;
	height: number;
	placements: BuildingData[];
}

export const dataToJSONBase64 = (data: SerializedData) => {
	const json = JSON.stringify(data);
	const encoded = Buffer.from(json, "utf8").toString("base64");
	return encoded;
};

export const dataFromJSONBase64 = (load: string) => {
	try {
		const decoded = Buffer.from(load, "base64").toString("utf-8");
		const data = JSON.parse(decoded);
		return data as SerializedData;
	} catch {
		return undefined;
	}
};

// https://stackoverflow.com/questions/28226677/save-inline-svg-as-jpeg-png-svg

export const saveAsPNG = async (svg: SVGSVGElement) => {
	console.log(svg.outerHTML);
	const svgString = new XMLSerializer().serializeToString(svg);
	console.log(svgString);
	const svgBlob = new Blob([svgString], {
		type: "image/svg+xml;charset=utf-8",
	});
	const DOMURL = window.URL || window.webkitURL || window;
	const url = DOMURL.createObjectURL(svgBlob);
	const image = new Image();

	image.width = svg.width.baseVal.value;
	image.height = svg.height.baseVal.value;
	image.src = url;
	image.onload = function () {
		const canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;

		const ctx = canvas.getContext("2d");
		ctx!.drawImage(image, 0, 0);
		DOMURL.revokeObjectURL(url);

		const imgURI = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		triggerDownload(imgURI);
		image.remove();
	};
};

function triggerDownload(imgURI: string) {
	const a = document.createElement("a");
	a.download = "anno_layout.png";
	a.target = "_blank";
	a.href = imgURI;
	a.click();
	a.remove();
}

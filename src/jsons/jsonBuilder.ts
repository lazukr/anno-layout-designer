import fs from "fs";
import path from "path-browserify";

import {
	Item,
	ImageItem,
	BuildingImageItem,
	BuildingDisplayItem,
	BuildingItem,
} from "../data/ItemDefinition";

import _gameListMap from "./gameListMap.json";
import _citizenListMap from "./citizenListMap.json";
import _buildingListMap from "./buildingListMap.json";
import _imageMap from "./imageMap.json";

function getWritePath(name: string) {
	return path.join(__dirname, "..", "data", name);
}

function generateJsons() {
	// image map
	const ImageMap = _imageMap as Record<string, string>;
	fs.writeFileSync(getWritePath("imageMap.json"), JSON.stringify(ImageMap));

	// game map containing citizen list
	const GameListMap = _gameListMap as Record<string, Item<string>>;
	fs.writeFileSync(
		getWritePath("gameItemsMap.json"),
		JSON.stringify(GameListMap)
	);

	// citizen map containing building list
	const CitizenImageItemMap = Object.entries(
		_citizenListMap as Record<string, Item<string>>
	).reduce((acc, [cid, citizen]) => {
		acc[cid] = {
			...citizen,
			imagePath: ImageMap[cid],
		};
		return acc;
	}, {} as Record<string, ImageItem>);
	fs.writeFileSync(
		getWritePath("citizenImageItemsMap.json"),
		JSON.stringify(CitizenImageItemMap)
	);

	// building map containing hierarchical production chain
	const BuildingImageItemMap: Record<string, BuildingImageItem> =
		Object.entries(_buildingListMap).reduce((acc, [bid, building]) => {
			acc[bid] = {
				id: bid,
				name: building.name,
				imagePath: ImageMap[bid],
				children: building.children.map((cid) => acc[cid]),
			};

			return acc;
		}, {} as Record<string, BuildingImageItem>);
	fs.writeFileSync(
		getWritePath("buildingImageItemsMap.json"),
		JSON.stringify(BuildingImageItemMap)
	);

	const BuildingDisplayDataURIMap: Record<string, string> = {};

	const BuildingDisplayItemMap: Record<string, BuildingDisplayItem> =
		Object.entries(_buildingListMap as Record<string, BuildingItem>).reduce(
			(acc, [bid, building]) => {
				acc[bid] = {
					id: bid,
					width: building.width,
					height: building.height,
					imagePath: ImageMap[bid],
				};

				BuildingDisplayDataURIMap[bid] = getDataUrl(ImageMap[bid]);
				return acc;
			},
			{} as Record<string, BuildingDisplayItem>
		);

	// building map containing display size
	fs.writeFileSync(
		getWritePath("buildingDisplayItemsMap.json"),
		JSON.stringify(BuildingDisplayItemMap)
	);

	// building map containing the datauri of the images
	fs.writeFileSync(
		getWritePath("buildingDisplayDataURIMap.json"),
		JSON.stringify(BuildingDisplayDataURIMap)
	);
}

function getDataUrl(imagePath: string) {
	const fullPath = path.join(__dirname, "..", "..", "public", imagePath);
	return `data:image/png;base64,${fs.readFileSync(fullPath, "base64")}`;
}

generateJsons();

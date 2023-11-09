import _gameItemsMap from "./gameItemsMap.json";
import _citizenImageItemsMap from "./citizenImageItemsMap.json";
import _buildingDisplayItemsMap from "./buildingDisplayItemsMap.json";
import _buildingImageItemsMap from "./buildingImageItemsMap.json";
import _buildingDisplayDataURIMap from "./buildingDisplayDataURIMap.json";
import _imageMap from "./imageMap.json";
import {
	Item,
	ImageItem,
	BuildingImageItem,
	BuildingDisplayItem,
} from "./ItemDefinition";

export const ImageMap = _imageMap as Record<string, string>;
export const GameItemsMap = _gameItemsMap as Record<string, Item<string>>;
export const CitizenImageItemsMap = _citizenImageItemsMap as Record<
	string,
	ImageItem
>;
export const BuildingImageItemsMap = _buildingImageItemsMap as Record<
	string,
	BuildingImageItem
>;
export const BuildingDisplayItemMap = _buildingDisplayItemsMap as Record<
	string,
	BuildingDisplayItem
>;

export const BuildingDisplayDataURIMap = _buildingDisplayDataURIMap as Record<
	string,
	string
>;

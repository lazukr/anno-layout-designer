export interface Item<T> {
	id: string;
	name: string;
	children: T[];
}

export interface BuildingItem {
	id: string;
	width: number;
	height: number;
}

interface HasImagePath {
	imagePath: string;
}

export interface ImageItem extends Item<string>, HasImagePath {}
export interface BuildingImageItem
	extends Item<BuildingImageItem>,
		HasImagePath {}

export interface BuildingDisplayItem extends BuildingItem, HasImagePath {}

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CursorInfo } from "../editor/CursorInfo";
import { setGrid } from "./gridSlice";

export interface BuildingData {
	building: string;
	startX: number;
	startY: number;
	rotated: boolean;
	id: string;
	endX: number;
	endY: number;
	fill: string;
}

interface PlacementSlice {
	placements: BuildingData[];
}

const initialState: PlacementSlice = {
	placements: [],
};

const placementSlice = createSlice({
	name: "placementSlice",
	initialState,
	reducers: {
		addPlacements: (state, action: PayloadAction<BuildingData[]>) => {
			state.placements.push(...action.payload);
		},
		removePlacements: (state, action: PayloadAction<CursorInfo>) => {
			state.placements = state.placements.filter((p) => {
				return !overlaps(p, action.payload);
			});
		},
		setPlacements: (state, action: PayloadAction<BuildingData[]>) => {
			state.placements = action.payload;
		},
		colourPlacements: (state, action: PayloadAction<[CursorInfo, string]>) => {
			const results = state.placements.filter((p) => {
				return overlaps(p, action.payload[0]);
			});

			const replaced = results.map((b) => {
				return {
					...b,
					fill: action.payload[1],
				};
			});

			state.placements = state.placements.filter((p) => {
				return !overlaps(p, action.payload[0]);
			});

			state.placements.push(...replaced);
		},
	},
	extraReducers(builder) {
		builder.addCase(setGrid, (state) => {
			state.placements = [];
		});
	},
});

export function uuidv4(): string {
	return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, (c: any) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
}

export function overlaps(building: BuildingData, cursorInfo: CursorInfo) {
	return !(
		cursorInfo.startX > building.endX ||
		cursorInfo.endX < building.startX ||
		cursorInfo.startY > building.endY ||
		cursorInfo.endY < building.startY
	);
}

export const {
	addPlacements,
	removePlacements,
	setPlacements,
	colourPlacements,
} = placementSlice.actions;
export const placementReducer = placementSlice.reducer;

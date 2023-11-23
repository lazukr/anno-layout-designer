import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CitizenImageItemsMap, GameItemsMap } from "../data/data";

interface SelectionSlice {
	game: string;
	citizen: string;
	building: string;
}

const initialState: SelectionSlice = {
	game: "1800",
	citizen: "1800_farmer",
	building: "1800_farmer_residence",
};

const NAME = "selectionSlice";

export const selectionSlice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		setGame: (state, action: PayloadAction<string>) => {
			state.game = action.payload;
			state.citizen = GameItemsMap[state.game].children[0];
			state.building = CitizenImageItemsMap[state.citizen].children[0];
		},
		setCitizen: (state, action: PayloadAction<string>) => {
			state.citizen = action.payload;
			state.building = CitizenImageItemsMap[state.citizen].children[0];
		},
		setBuilding: (state, action: PayloadAction<string>) => {
			state.building = action.payload;
		},
	},
});

export const { setGame, setCitizen, setBuilding } = selectionSlice.actions;
export const selectionReducer = selectionSlice.reducer;

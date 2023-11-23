import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GridSlice {
	width: number;
	height: number;
	gridSize: number;
}

const initialState: GridSlice = {
	width: 30,
	height: 30,
	gridSize: 32,
};

const gridSlice = createSlice({
	name: "gridSlice",
	initialState,
	reducers: {
		setGridSize: (state, action: PayloadAction<number>) => {
			state.gridSize = action.payload;
		},
		setGrid: (state, action: PayloadAction<[number, number]>) => {
			state.width = action.payload[0];
			state.height = action.payload[1];
		},
	},
});

export const { setGrid, setGridSize } = gridSlice.actions;
export const gridReducer = gridSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CursorInfo } from "../editor/CursorInfo";

const intitialState: CursorInfo = {
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0,
	adjustX: false,
	adjustY: false,
};

const cursorInfoSlice = createSlice({
	name: "cursorInfoSlice",
	initialState: intitialState,
	reducers: {
		setCursorInfo: (_, action: PayloadAction<CursorInfo>) => {
			return action.payload;
		},
	},
});

export const { setCursorInfo } = cursorInfoSlice.actions;
export const cursorInfoReducer = cursorInfoSlice.reducer;

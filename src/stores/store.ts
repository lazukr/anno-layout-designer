import { configureStore } from "@reduxjs/toolkit";
import { selectionReducer } from "./selectionSlice";
import { gridReducer } from "./gridSlice";
import { modalReducer } from "./modalSlice";
import { colourPickerReducer } from "./colourPickerSlice";
import { cursorActionReducer } from "./cursorActionSlice";
import { placementReducer } from "./placementSlice";
import { cursorInfoReducer } from "./cursorInfoSlice";

export const store = configureStore({
	reducer: {
		buildingSelector: selectionReducer,
		grid: gridReducer,
		modal: modalReducer,
		colourPicker: colourPickerReducer,
		cursorAction: cursorActionReducer,
		placements: placementReducer,
		cursorInfo: cursorInfoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {
	PreloadedState,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import { selectionReducer } from "./selectionSlice";
import { gridReducer } from "./gridSlice";
import { modalReducer } from "./modalSlice";
import { colourPickerReducer } from "./colourPickerSlice";
import { cursorActionReducer } from "./cursorActionSlice";
import { placementReducer } from "./placementSlice";
import { cursorInfoReducer } from "./cursorInfoSlice";

const rootReducer = combineReducers({
	buildingSelector: selectionReducer,
	grid: gridReducer,
	modal: modalReducer,
	colourPicker: colourPickerReducer,
	cursorAction: cursorActionReducer,
	placements: placementReducer,
	cursorInfo: cursorInfoReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	});
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

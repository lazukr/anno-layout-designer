import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { setBuilding, setCitizen, setGame } from "./selectionSlice";
export enum CursorAction {
	Create,
	Delete,
	Colour,
	Select,
	Place,
}

export const BuildingCursorGroup = [CursorAction.Create, CursorAction.Place];
export const SelectionCursorGroup = [
	CursorAction.Delete,
	CursorAction.Colour,
	CursorAction.Select,
];

interface CursorActionSlice {
	action: CursorAction;
}

const initialState: CursorActionSlice = {
	action: CursorAction.Create,
};

const cursorActionSlice = createSlice({
	name: "cursorActionSlice",
	initialState,
	reducers: {
		setAction: (state, action: PayloadAction<CursorAction>) => {
			state.action = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addMatcher(isAnyOf(setBuilding, setCitizen, setGame), (state) => {
			state.action = CursorAction.Create;
		});
	},
});

export const { setAction } = cursorActionSlice.actions;
export const cursorActionReducer = cursorActionSlice.reducer;

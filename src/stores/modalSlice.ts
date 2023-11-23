import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { setGrid } from "./gridSlice";

export enum ModalType {
	NewGrid,
	Import,
	Export,
	Info,
}

interface ModalSlice {
	active: boolean;
	type: ModalType;
}

const initialState: ModalSlice = {
	active: false,
	type: ModalType.Info,
};

const modalSlice = createSlice({
	name: "modalSlice",
	initialState,
	reducers: {
		showModal: (state) => {
			state.active = true;
		},

		hideModal: (state) => {
			state.active = false;
		},

		updateType: (state, action: PayloadAction<ModalType>) => {
			state.type = action.payload;
			state.active = true;
		},
	},

	extraReducers(builder) {
		builder.addCase(setGrid, (state) => {
			state.active = false;
		});
	},
});

export const { showModal, hideModal, updateType } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

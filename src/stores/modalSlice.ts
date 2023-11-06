import { createSlice } from "@reduxjs/toolkit";

enum ModalType {
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
	},
});

export const { showModal, hideModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ColourPickerSlice {
	colour: string;
	active: boolean;
}

const initialState: ColourPickerSlice = {
	colour: '#00ffff',
	active: false,
};

const colourPickerSlice = createSlice({
	name: 'colourPickerSlice',
	initialState,
	reducers: {
		setColour: (state, action: PayloadAction<string>) => {
			state.colour = action.payload;
		},
		updateColourPicker: (state) => {
			state.active = !state.active;
		},
		hideColourPicker: (state) => {
			state.active = false;
		},
	},
});

export const { updateColourPicker, hideColourPicker, setColour } =
	colourPickerSlice.actions;
export const colourPickerReducer = colourPickerSlice.reducer;

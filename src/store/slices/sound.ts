import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface FormationState {
	withSound: boolean;
}

// Define the initial state using that type
const initialState: FormationState = {
	withSound: true,
};

export const soundSlice = createSlice({
	name: 'sound',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		toggleSound: (state, action: PayloadAction<boolean>) => {
			console.log(action.payload);
			state.withSound = action.payload;
		},
		resetFormation: () => initialState,
	},
});

export const { toggleSound } = soundSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default soundSlice.reducer;

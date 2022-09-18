import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ILayoutState {
	mobileMenuOpen: boolean;
}

// Define the initial state using that type
const initialState: ILayoutState = {
	mobileMenuOpen: false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		toggleMenu: state => {
			state.mobileMenuOpen = !state.mobileMenuOpen;
		},
	},
});

export const { toggleMenu } = layoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default layoutSlice.reducer;

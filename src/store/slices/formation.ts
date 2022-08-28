import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface FormationState {
	isDraggingPlayer: boolean;
}

// Define the initial state using that type
const initialState: FormationState = {
	isDraggingPlayer: false,
};

export const formationSlice = createSlice({
	name: 'formation',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setIsDraggingPlayer: (state, action: PayloadAction<boolean>) => {
			state.isDraggingPlayer = action.payload;
		},
	},
});

export const { setIsDraggingPlayer } = formationSlice.actions;

// Other code such as selectors can use the imported `RootState` type

// GETTERS
export const selectIsDraggingPlayer = (state: RootState) => state.formation.isDraggingPlayer;

export default formationSlice.reducer;

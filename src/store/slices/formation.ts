import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Player } from '@/types/Player';
import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { OptionType } from '@/types/OptionType';
import { PLAYERS } from '@/data/players';

// Define a type for the slice state
interface FormationState {
	formation: OptionType;
	playersInField: Player[];
	playersInList: Player[];
	playerToReplaceOnOrigin: Player | null;
	playerIdToReplace: number | null;
	isDraggingPlayer: boolean;
}

// Define the initial state using that type
const initialState: FormationState = {
	formation: FORMATION_OPTIONS[0],
	playersInField: [],
	playersInList: PLAYERS,
	playerToReplaceOnOrigin: null,
	playerIdToReplace: null,
	isDraggingPlayer: false,
};

export const formationSlice = createSlice({
	name: 'formation',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setFormation: (state, action: PayloadAction<OptionType>) => {
			state.formation = action.payload;
		},
		addPlayerToField: (state, action: PayloadAction<Player>) => {
			state.playersInField.push(action.payload);
			state.playersInList = state.playersInList.filter(player => player.id !== action.payload.id);
		},
		removePlayerFromField: (state, action: PayloadAction<Player>) => {
			state.playersInField = state.playersInField.filter(player => player.id !== action.payload.id);
			state.playersInList.unshift(action.payload);
		},
		setIsDraggingPlayer: (state, action: PayloadAction<boolean>) => {
			state.isDraggingPlayer = action.payload;
		},
		setPlayerToReplaceOnOrigin: (state, action: PayloadAction<Player>) => {
			state.playerToReplaceOnOrigin = action.payload;
		},
		setPlayerIdToReplace: (state, action: PayloadAction<number>) => {
			state.playerIdToReplace = action.payload;
		},
	},
});

export const {
	setFormation,
	addPlayerToField,
	removePlayerFromField,
	setIsDraggingPlayer,
	setPlayerToReplaceOnOrigin,
	setPlayerIdToReplace,
} = formationSlice.actions;

// Other code such as selectors can use the imported `RootState` type

// GETTERS
export const selectIsDraggingPlayer = (state: RootState) => state.formation.isDraggingPlayer;

export default formationSlice.reducer;

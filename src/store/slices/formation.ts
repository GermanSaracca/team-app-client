import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '@/types/Player';
import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { PLAYERS } from '@/data/players';

// Define a type for the slice state
interface FormationState {
	formation: string;
	teamSize: number;
	playersInField: IPlayer[];
	playersInList: IPlayer[];
	isDraggingPlayer: boolean;
}

// Define the initial state using that type
const initialState: FormationState = {
	formation: FORMATION_OPTIONS[0].value,
	teamSize: 11,
	playersInField: [],
	playersInList: PLAYERS,
	isDraggingPlayer: false,
};
/**
 *  Immer is a library that simplifies the process of writing immutable update logic.
	Immer provides a function called produce, which accepts two arguments: your original state, and a callback function. The callback function is given a "draft" version of that state, and inside the callback, it is safe to write code that mutates the draft value. Immer tracks all attempts to mutate the draft value and then replays those mutations using their immutable equivalents to create a safe, immutably updated result
 *  createReducer API uses Immer internally automatically. So, it's already safe to "mutate" state inside of any case reducer 		 function that is passed to createReducer
 * In turn, createSlice uses createReducer inside, so it's also safe to "mutate" state there as well
 */
export const formationSlice = createSlice({
	name: 'formation',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setFormation: (state, action: PayloadAction<string>) => {
			state.formation = action.payload;
		},
		setTeamSize: (state, action: PayloadAction<number>) => {
			state.teamSize = action.payload;
		},
		addPlayerToField: (state, action: PayloadAction<IPlayer>) => {
			// Add player to field
			state.playersInField.push(action.payload);
			// Order the update playersInField array
			state.playersInField.sort((a, b) => Number(a.fieldPosition) - Number(b.fieldPosition));
			// Then remove player from players in list
			state.playersInList = state.playersInList.filter(player => player.id !== action.payload.id);
		},
		removePlayerFromField: (state, action: PayloadAction<IPlayer>) => {
			// Remove player from field
			state.playersInField = state.playersInField.filter(player => player.id !== action.payload.id);
			// Add player to top of aside list
			state.playersInList.unshift(action.payload);
		},
		removeAllPlayerFromField: state => {
			state.playersInField = initialState.playersInField;
			state.playersInList = initialState.playersInList;
		},
		/**
		 * Receives an Array of 2 players, first is current player, second is one being dragged to where current is.
		 */
		replacePlayers: (state, action: PayloadAction<IPlayer[]>) => {
			// Find player one add field position of player two, and viceversa
			const playerOne = state.playersInField.find(player => player.id === action.payload[0]?.id);
			const playerTwo = state.playersInField.find(player => player.id === action.payload[1].id);

			if (playerOne && playerTwo) {
				playerOne.fieldPosition = action.payload[1].fieldPosition;
				playerTwo.fieldPosition = action.payload[0].fieldPosition;
			}
		},
		/**
		 * Receives an Array of 2 players.
		 * First one is one to delete on that spot of field
		 * Second one is one to add
		 */
		changePlayerFieldPosition: (
			state,
			action: PayloadAction<{ player: IPlayer; newFieldPosition: IPlayer['fieldPosition'] }>
		) => {
			// Find player to change position
			const playerToEditFieldPosition = state.playersInField.find(
				p => p.id === action.payload.player.id
			);

			if (playerToEditFieldPosition) {
				playerToEditFieldPosition.fieldPosition = action.payload.newFieldPosition;
			}
		},
		setIsDraggingPlayer: (state, action: PayloadAction<boolean>) => {
			state.isDraggingPlayer = action.payload;
		},
		resetFormation: () => initialState,
	},
});

export const {
	setFormation,
	setTeamSize,
	addPlayerToField,
	removePlayerFromField,
	removeAllPlayerFromField,
	replacePlayers,
	changePlayerFieldPosition,
	setIsDraggingPlayer,
	resetFormation,
} = formationSlice.actions;

export default formationSlice.reducer;

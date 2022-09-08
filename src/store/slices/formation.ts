import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Player } from '@/types/Player';
import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { FormationOptionType } from '@/types/FormationOptionType';
import { PLAYERS } from '@/data/players';

// Define a type for the slice state
interface FormationState {
	formation: string;
	teamSize: number;
	playersInField: Player[];
	playersInList: Player[];
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
		addPlayerToField: (state, action: PayloadAction<Player>) => {
			// Push to Array
			state.playersInField.push(action.payload);
			// Order by fieldPosition
			state.playersInField.sort((a, b) => Number(a.fieldPosition) - Number(b.fieldPosition));
			// Remove player from players in list
			state.playersInList = state.playersInList.filter(player => player.id !== action.payload.id);
		},
		removePlayerFromField: (state, action: PayloadAction<Player>) => {
			state.playersInField = state.playersInField.filter(player => player.id !== action.payload.id);
			state.playersInList.unshift(action.payload);
		},

		/**
		 * Receives an Array of 2 players, first is current player, second is one being dragged to where current is.
		 */
		replacePlayers: (state, action: PayloadAction<Player[]>) => {
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
		addPlayerFromFieldToEmptySpot: (state, action: PayloadAction<Player[]>) => {
			// Delete in previous spot
			const deletePlayerOnSpotIndex = state.playersInField.findIndex(
				player => player.id === action.payload[0].id
			);
			state.playersInField.splice(deletePlayerOnSpotIndex, 1);

			// Add player
			state.playersInField.push(action.payload[1]);
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
	replacePlayers,
	addPlayerFromFieldToEmptySpot,
	setIsDraggingPlayer,
	resetFormation,
} = formationSlice.actions;

// Other code such as selectors can use the imported `RootState` type

// GETTERS
export const selectIsDraggingPlayer = (state: RootState) => state.formation.isDraggingPlayer;

export default formationSlice.reducer;

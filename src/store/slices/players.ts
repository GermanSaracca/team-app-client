import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '@/types/Player';
import { PLAYERS } from '@/data/players';

// Define a type for the slice state
interface PlayersState {
	players: IPlayer[];
}

// Define the initial state using that type
const initialState: PlayersState = {
	players: PLAYERS,
};

export const playersSlice = createSlice({
	name: 'players',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		createPlayer: (state, action: PayloadAction<IPlayer>) => {
			console.log(action.payload);
		},
		editPlayer: (state, action: PayloadAction<IPlayer>) => {
			console.log(action.payload);
		},
		deletePlayer: (state, action: PayloadAction<IPlayer['id']>) => {
			console.log(action.payload);
		},
	},
});

export const { createPlayer, editPlayer, deletePlayer } = playersSlice.actions;

export default playersSlice.reducer;

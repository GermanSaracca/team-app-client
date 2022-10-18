import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '@/types/Player';
import { PLAYERS } from '@/data';

// Define a type for the slice state
interface PlayersState {
	players: IPlayer[];
	selectedFile: string | null;
	userImageBlob: string | null;
}

// Define the initial state using that type
const initialState: PlayersState = {
	players: PLAYERS,
	selectedFile: null,
	userImageBlob: null,
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
		setSelectedFile: (state, action: PayloadAction<string | null>) => {
			state.selectedFile = action.payload;
		},
		setUserImageBlob: (state, action: PayloadAction<string | null>) => {
			state.userImageBlob = action.payload;
		},
	},
});

export const { createPlayer, editPlayer, deletePlayer, setSelectedFile, setUserImageBlob } =
	playersSlice.actions;

export default playersSlice.reducer;

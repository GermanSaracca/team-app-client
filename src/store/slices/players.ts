import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '@/types/Player';
import { getPlayers } from '@/libs/firebase';

// ASYNCS THUNKS
export const getAllPlayers = createAsyncThunk('playersSlice/getAllPlayers', getPlayers);

// Define a type for the slice state
export interface PlayersState {
	players: IPlayer[];
	loadingGetAllPlayers: boolean;
	errorGetAllPlayers: any;
}

// Define the initial state using that type
const initialState: PlayersState = {
	players: [],
	loadingGetAllPlayers: false,
	errorGetAllPlayers: null,
};

export const playersSlice = createSlice({
	name: 'players',
	initialState,
	reducers: {
		// createPlayer: (state, action: PayloadAction<IPlayer>) => {
		// 	console.log(action.payload);
		// },
		// editPlayer: (state, action: PayloadAction<IPlayer>) => {
		// 	console.log(action.payload);
		// },
		// deletePlayer: (state, action: PayloadAction<IPlayer['id']>) => {
		// 	console.log(action.payload);
		// },
	},
	extraReducers: builder => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder
			.addCase(getAllPlayers.pending, (state, action) => {
				state.loadingGetAllPlayers = true;
			})
			.addCase(getAllPlayers.fulfilled, (state, action) => {
				const allPlayers: IPlayer[] = [];

				action.payload.docs.forEach(doc => {
					allPlayers.push({
						...(doc.data() as {
							avatar: IPlayer['avatar'];
							position: IPlayer['position'];
							fullName: IPlayer['fullName'];
						}),
						id: doc.id,
					});
				});

				state.players = allPlayers;
				state.loadingGetAllPlayers = false;
			})
			.addCase(getAllPlayers.rejected, (state, action) => {
				state.errorGetAllPlayers = true;
			});
	},
});

// export const { createPlayer, editPlayer, deletePlayer } = playersSlice.actions;

export default playersSlice.reducer;

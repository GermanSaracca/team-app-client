import { configureStore } from '@reduxjs/toolkit';
import { formationSlice, formationListener } from './slices/formation';
import { layoutSlice } from './slices/layout';
import { playersSlice } from './slices/players';
import { soundSlice } from './slices/sound';

export const store = configureStore({
	reducer: {
		formation: formationSlice.reducer,
		players: playersSlice.reducer,
		sound: soundSlice.reducer,
		layout: layoutSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).prepend(formationListener.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

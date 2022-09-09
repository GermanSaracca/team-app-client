import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counter';
import { formationSlice } from './slices/formation';
import { soundSlice } from './slices/sound';

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		formation: formationSlice.reducer,
		sound: soundSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

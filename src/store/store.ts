import {configureStore} from '@reduxjs/toolkit';

import metagraphSlice from '@/store/metagraph.slice.ts';
import metanodeSlice from '@/store/metanode.slice.ts';
import modelSlice from '@/store/models.slice.ts';

export const store = configureStore({
	reducer: {
		models: modelSlice,
		metagraph: metagraphSlice,
		metanodes: metanodeSlice
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
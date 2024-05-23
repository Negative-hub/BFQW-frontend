import {createSlice} from '@reduxjs/toolkit';

import {createModelAsyncThunk, deleteModelAsyncThunk, fetchModelsAsyncThunk} from '@/store/model/async/models.ts';
import {Option} from '@/types/general.ts';

interface ModelsState {
	models: Option[];
	selectedModel: Option | null;
}

const initialState: ModelsState = {
	models: [],
	selectedModel: null
};

const modelSlice = createSlice({
	name: 'models',
	initialState,
	reducers: {
		setSelectedModel(state, action: {payload: Option, type: string}) {
			state.selectedModel = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchModelsAsyncThunk.fulfilled, (state, action) => {
			state.models = action.payload;
			state.selectedModel = state.models[0] ? state.models[0] : null;
		});

		builder.addCase(createModelAsyncThunk.fulfilled, (state, action) => {
			state.models.push(action.payload);
			state.selectedModel = action.payload;
		});

		builder.addCase(deleteModelAsyncThunk.fulfilled, (state, action) => {
			state.models = state.models.filter((model) => model.id !== action.payload);

			if (state.selectedModel && state.selectedModel.id === action.payload) {
				state.selectedModel = null;
			}
		});
	}
});

export const {setSelectedModel} = modelSlice.actions;

export default modelSlice.reducer;
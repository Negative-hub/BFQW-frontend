import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import modelsApi, {CreateModelPayload} from '@/api/models/index.ts';
import {Option} from '@/types/general.ts';
import showErrorToast from '@/utils/showErrorToast.ts';
import showToast from '@/utils/showToast.ts';

export const fetchUserModels = createAsyncThunk(
	'models/fetchUserModels',
	async (params: {userId: number}): Promise<Option[]> => {
		try {
			return modelsApi.getUserModels(params.userId);
		} catch (e) {
			showErrorToast(e);
		}

		return [];
	}
);

export const createModel = createAsyncThunk(
	'models/createModel',
	async (payload: CreateModelPayload): Promise<Option | undefined> => {
		try {
			const model = await modelsApi.postModel(payload);
			showToast({type: 'success', message: 'Модель успешно создана'});

			return model;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

export const deleteModel = createAsyncThunk(
	'models/deleteModel',
	async (params: {modelId: number}): Promise<number | undefined> => {
		try {
			await modelsApi.deleteModel(params.modelId);
			showToast({type: 'success', message: 'Модель успешно удалена'});
			return params.modelId;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

interface ModelsState {
	models: Option[];
}

const initialState: ModelsState = {
	models: []
};

// Then, handle actions in your reducers:
const modelSlice = createSlice({
	name: 'models',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserModels.fulfilled, (state, action) => {
			state.models = action.payload;
		});

		builder.addCase(createModel.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.models.push(action.payload);
		});

		builder.addCase(deleteModel.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.models = state.models.filter((model) => model.id !== action.payload);
		});
	}
});

export default modelSlice.reducer;
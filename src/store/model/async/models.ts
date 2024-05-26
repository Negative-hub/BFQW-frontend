import {createAsyncThunk} from '@reduxjs/toolkit';

import modelsApi, {CreateModelPayload} from '@/api/models';
import {Option} from '@/types/general.ts';

export const fetchModelsAsyncThunk = createAsyncThunk(
	'models/fetchModels',
	async (): Promise<Option[]> => {
		return modelsApi.getModels();
	}
);

export const createModelAsyncThunk = createAsyncThunk(
	'models/createModel',
	async (payload: CreateModelPayload): Promise<Option> => {
		return modelsApi.postModel(payload);
	}
);

export const deleteModelAsyncThunk = createAsyncThunk(
	'models/deleteModel',
	async (params: {modelId: number}): Promise<number> => {
		await modelsApi.deleteModel(params.modelId);
		return params.modelId;
	}
);
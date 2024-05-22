import {createAsyncThunk} from '@reduxjs/toolkit';

import modelsApi, {CreateModelPayload} from '@/api/models';
import {Option} from '@/types/general.ts';
import showToast from '@/utils/showToast.ts';

export const fetchModelsAsyncThunk = createAsyncThunk(
	'models/fetchModels',
	async (): Promise<Option[]> => {
		return modelsApi.getModels();
	}
);

export const createModelAsyncThunk = createAsyncThunk(
	'models/createModel',
	async (payload: CreateModelPayload): Promise<Option> => {
		const model = await modelsApi.postModel(payload);
		showToast({type: 'success', message: 'Модель успешно создана'});

		return model;
	}
);

export const deleteModelAsyncThunk = createAsyncThunk(
	'models/deleteModel',
	async (params: {modelId: number}): Promise<number> => {
		await modelsApi.deleteModel(params.modelId);
		showToast({type: 'success', message: 'Модель успешно удалена'});

		return params.modelId;
	}
);
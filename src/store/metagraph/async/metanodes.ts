import {createAsyncThunk} from '@reduxjs/toolkit';

import metanodeApi, {CreateMetanodePayload, getMetanodesParams, UpdateMetanodePayload} from '@/api/metanodes';
import {MetagraphNode, Option} from '@/types/general.ts';
import showToast from '@/utils/showToast.ts';

export const getMetanodesAsyncThunk = createAsyncThunk(
	'metanodes/getMetanodes',
	async (params: getMetanodesParams): Promise<Option[]> => {
		return metanodeApi.getMetanodes(params);
	}
);

export const createMetanodeAsyncThunk = createAsyncThunk(
	'metanodes/createMetanode',
	async (payload: CreateMetanodePayload): Promise<MetagraphNode[]> => {
		const nodes = await metanodeApi.postMetanode(payload);
		showToast({type: 'success', message: 'Метавершина успешно создана'});

		return nodes;
	}
);

export const updateMetanodeAsyncThunk = createAsyncThunk(
	'metanodes/updateMetanode',
	async (payload: UpdateMetanodePayload): Promise<Option> => {
		const metanode = await metanodeApi.updateMetanode(payload);
		showToast({type: 'success', message: 'Метавершина успешно обновлена'});

		return metanode;
	}
);

export const deleteMetanodeAsyncThunk = createAsyncThunk(
	'metanodes/deleteMetanode',
	async (params: {metanodeId: number}): Promise<number> => {
		await metanodeApi.deleteMetanode(params.metanodeId);
		showToast({type: 'success', message: 'Метавершина успешно удалена'});

		return params.metanodeId;
	}
);
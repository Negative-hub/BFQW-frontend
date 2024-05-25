import {createAsyncThunk} from '@reduxjs/toolkit';

import metanodeApi, {CreateMetanodePayload, GetMetanodesParams, UpdateMetanodePayload} from '@/api/metanodes';
import {MetagraphNode, Option} from '@/types/general.ts';

export const getMetanodesAsyncThunk = createAsyncThunk(
	'metanodes/getMetanodes',
	async (params: GetMetanodesParams): Promise<Option[]> => {
		return metanodeApi.getMetanodes(params);
	}
);

export const createMetanodeAsyncThunk = createAsyncThunk(
	'metanodes/createMetanode',
	async (params: CreateMetanodePayload): Promise<MetagraphNode[]> => {
		return metanodeApi.postMetanode(params);
	}
);

export const updateMetanodeAsyncThunk = createAsyncThunk(
	'metanodes/updateMetanode',
	async (payload: UpdateMetanodePayload): Promise<MetagraphNode[]> => {
		return metanodeApi.updateMetanode(payload);
	}
);

export const deleteMetanodeAsyncThunk = createAsyncThunk(
	'metanodes/deleteMetanode',
	async (params: {metanodeId: number, cluster: number[]}): Promise<number[]> => {
		await metanodeApi.deleteMetanode(params.metanodeId);


		return params.cluster;
	}
);
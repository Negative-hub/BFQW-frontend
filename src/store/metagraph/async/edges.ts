import {createAsyncThunk} from '@reduxjs/toolkit';

import edgesApi, {CreateEdgePayload, GetEdgesParams, UpdateEdgePayload} from '@/api/edges';
import {MetagraphEdge} from '@/types/general.ts';
import showToast from '@/utils/showToast.ts';

export const getEdgesAsyncThunk = createAsyncThunk(
	'edges/getEdges',
	async (params: GetEdgesParams): Promise<MetagraphEdge[]> => {
		try {
			return edgesApi.getEdges(params);
		} catch (e) {
			return [];
		}
	}
);
export const createEdgeAsyncThunk = createAsyncThunk(
	'edges/createEdge',
	async (payload: CreateEdgePayload): Promise<MetagraphEdge> => {
		const node = await edgesApi.postEdge(payload);
		showToast({type: 'success', message: 'Ребро успешно создано'});

		return node;
	}
);

export const updateEdgeAsyncThunk = createAsyncThunk(
	'edges/updateEdge',
	async (payload: UpdateEdgePayload): Promise<MetagraphEdge> => {
		const node = await edgesApi.updateEdge(payload);
		showToast({type: 'success', message: 'Ребро успешно изменено'});

		return node;
	}
);

export const deleteEdgeAsyncThunk = createAsyncThunk(
	'edges/deleteEdge',
	async (params: {edgeId: number}): Promise<number> => {
		await edgesApi.deleteEdge(params.edgeId);
		showToast({type: 'success', message: 'Ребро успешно удалено'});

		return params.edgeId;
	}
);
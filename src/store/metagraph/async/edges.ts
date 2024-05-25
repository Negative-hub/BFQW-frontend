import {createAsyncThunk} from '@reduxjs/toolkit';

import edgesApi, {CreateEdgePayload, GetEdgesParams, UpdateEdgePayload} from '@/api/edges';
import {MetagraphEdge} from '@/types/general.ts';

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
		return edgesApi.postEdge(payload);
	}
);

export const updateEdgeAsyncThunk = createAsyncThunk(
	'edges/updateEdge',
	async (payload: UpdateEdgePayload): Promise<MetagraphEdge> => {
		return edgesApi.updateEdge(payload);
	}
);

export const deleteEdgeAsyncThunk = createAsyncThunk(
	'edges/deleteEdge',
	async (params: {edgeId: number}): Promise<number> => {
		await edgesApi.deleteEdge(params.edgeId);

		return params.edgeId;
	}
);
import {createAsyncThunk} from '@reduxjs/toolkit';

import nodesApi, {CreateNodePayload, GetNodesParams, UpdateNodePayload} from '@/api/nodes';
import {MetagraphNode} from '@/types/general.ts';

export const getNodesAsyncThunk = createAsyncThunk(
	'nodes/getNodes',
	async (params: GetNodesParams): Promise<MetagraphNode[]> => {
		try {
			return nodesApi.getNodes(params);
		} catch (e) {
			return [];
		}
	}
);
export const createNodeAsyncThunk = createAsyncThunk(
	'nodes/createNode',
	async (payload: CreateNodePayload): Promise<MetagraphNode> => {
		return nodesApi.postNode(payload);
	}
);

export const updateNodeAsyncThunk = createAsyncThunk(
	'nodes/updateNode',
	async (payload: UpdateNodePayload): Promise<MetagraphNode> => {
		return nodesApi.updateNode(payload);
	}
);

export const deleteNodeAsyncThunk = createAsyncThunk(
	'nodes/deleteNode',
	async (params: {nodeId: number}): Promise<number> => {
		await nodesApi.deleteNode(params.nodeId);

		return params.nodeId;
	}
);
import {createAsyncThunk} from '@reduxjs/toolkit';

import nodesApi, {CreateNodePayload, GetNodesParams, UpdateNodePayload} from '@/api/nodes';
import {MetagraphNode} from '@/types/general.ts';
import showToast from '@/utils/showToast.ts';

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
		const node = await nodesApi.postNode(payload);
		showToast({type: 'success', message: 'Вершина успешно создана'});

		return node;
	}
);

export const updateNodeAsyncThunk = createAsyncThunk(
	'nodes/updateNode',
	async (payload: UpdateNodePayload): Promise<MetagraphNode> => {
		const node = await nodesApi.updateNode(payload);
		showToast({type: 'success', message: 'Вершина успешно изменена'});

		return node;
	}
);

export const deleteNodeAsyncThunk = createAsyncThunk(
	'nodes/deleteNode',
	async (params: {nodeId: number}): Promise<number> => {
		await nodesApi.deleteNode(params.nodeId);
		showToast({type: 'success', message: 'Вершина успешно удалена'});

		return params.nodeId;
	}
);
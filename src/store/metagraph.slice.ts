import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import nodesApi, {CreateNodePayload, UpdateNodePayload} from '@/api/nodes/index.ts';
import {MetagraphEdge, MetagraphNode} from '@/types/general.ts';
import showErrorToast from '@/utils/showErrorToast.ts';
import showToast from '@/utils/showToast.ts';

export const createNode = createAsyncThunk(
	'nodes/createNode',
	async (payload: CreateNodePayload): Promise<MetagraphNode | undefined> => {
		try {
			const node = await nodesApi.postNode(payload);
			showToast({type: 'success', message: 'Вершина успешно создана'});

			return node;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

export const updateNode = createAsyncThunk(
	'nodes/updateNode',
	async (payload: UpdateNodePayload): Promise<MetagraphNode | undefined> => {
		try {
			const node = await nodesApi.updateNode(payload);
			showToast({type: 'success', message: 'Вершина успешно изменена'});
			return node;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

export const deleteNode = createAsyncThunk(
	'delete/updateNode',
	async (params: {nodeId: number}): Promise<number | undefined> => {
		try {
			await nodesApi.deleteNode(params.nodeId);
			showToast({type: 'success', message: 'Вершина успешно удалена'});
			return params.nodeId;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

interface Metagraph {
	nodes: MetagraphNode[];
	edges: MetagraphEdge[];
}

const initialState: Metagraph = {
	nodes: [],
	edges: []
};

// Then, handle actions in your reducers:
const metagraphSlice = createSlice({
	name: 'metagraph',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
	},
	extraReducers: (builder) => {
		builder.addCase(createNode.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.nodes.push(action.payload);
		});
		builder.addCase(updateNode.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.nodes = state.nodes.map((node) => {
				return node.id === action.payload?.id ? action.payload : node;
			});
		});
		builder.addCase(deleteNode.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.nodes = state.nodes.filter((node) => node.id !== action.payload);
		});
	}
});

export default metagraphSlice.reducer;
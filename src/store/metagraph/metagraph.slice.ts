import {createSlice} from '@reduxjs/toolkit';

import {createAttributeAsyncThunk, getAttributesAsyncThunk} from '@/store/metagraph/async/attributes.ts';
import {
	createEdgeAsyncThunk,
	deleteEdgeAsyncThunk,
	getEdgesAsyncThunk,
	updateEdgeAsyncThunk
} from '@/store/metagraph/async/edges.ts';
import {
	createMetanodeAsyncThunk,
	getMetanodesAsyncThunk,
	updateMetanodeAsyncThunk
} from '@/store/metagraph/async/metanodes.ts';
import {
	createNodeAsyncThunk,
	deleteNodeAsyncThunk,
	getNodesAsyncThunk,
	updateNodeAsyncThunk
} from '@/store/metagraph/async/nodes.ts';
import {AttributeOption, MetagraphEdge, MetagraphNode, Option} from '@/types/general.ts';

interface Metagraph {
	nodes: MetagraphNode[];
	edges: MetagraphEdge[];
	metanodes: Option[];
	attributes: AttributeOption[];
}

const initialState: Metagraph = {
	nodes: [],
	edges: [],
	metanodes: [],
	attributes: []
};

const metagraphSlice = createSlice({
	name: 'metagraph',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getNodesAsyncThunk.fulfilled, (state, action) => {
			state.nodes = action.payload;
		});

		builder.addCase(createNodeAsyncThunk.fulfilled, (state, action) => {
			state.nodes.push(action.payload);
		});

		builder.addCase(updateNodeAsyncThunk.fulfilled, (state, action) => {
			state.nodes = state.nodes.map((node) => node.id === action.payload.id ? action.payload : node);
		});

		builder.addCase(deleteNodeAsyncThunk.fulfilled, (state, action) => {
			state.nodes = state.nodes.filter((node) => +node.id !== action.payload);
		});

		builder.addCase(getMetanodesAsyncThunk.fulfilled, (state, action) => {
			state.metanodes = action.payload;
		});

		builder.addCase(createMetanodeAsyncThunk.fulfilled, (state, action) => {
			for (const node of action.payload) {
				state.nodes = state.nodes.map((n) => n.id === node.id ? node : n);
			}
		});

		builder.addCase(updateMetanodeAsyncThunk.fulfilled, (state, action) => {
			for (const node of action.payload) {
				state.nodes = state.nodes.map((n) => n.id === node.id ? node : n);
			}
		});

		builder.addCase(getAttributesAsyncThunk.fulfilled, (state, action) => {
			state.attributes = action.payload;
		});

		builder.addCase(createAttributeAsyncThunk.fulfilled, (state, action) => {
			state.attributes.push(action.payload);
		});

		builder.addCase(getEdgesAsyncThunk.fulfilled, (state, action) => {
			state.edges = action.payload;
		});

		builder.addCase(createEdgeAsyncThunk.fulfilled, (state, action) => {
			state.edges.push(action.payload);
		});

		builder.addCase(updateEdgeAsyncThunk.fulfilled, (state, action) => {
			state.edges = state.edges.map((edge) => edge.id === action.payload.id ? action.payload : edge);
		});

		builder.addCase(deleteEdgeAsyncThunk.fulfilled, (state, action) => {
			state.edges = state.edges.filter((edge) => +edge.id !== action.payload);
		});
	}
});

export default metagraphSlice.reducer;
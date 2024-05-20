import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import metanodeApi, {
	CreateMetanodePayload,
	GetMetanodesByModelParams,
	UpdateMetanodePayload
} from '@/api/metanodes/index.ts';
import {Option} from '@/types/general.ts';
import showErrorToast from '@/utils/showErrorToast.ts';
import showToast from '@/utils/showToast.ts';

export const getMetanodesByModel = createAsyncThunk(
	'metanode/getMetanodesByModel',
	async (params: GetMetanodesByModelParams): Promise<Option[]> => {
		try {
			return metanodeApi.getMetanodesByModel(params);
		} catch (e) {
			showErrorToast(e);
		}

		return [];
	}
);

export const createMetanode = createAsyncThunk(
	'metanode/createMetanode',
	async (payload: CreateMetanodePayload): Promise<Option | undefined> => {
		try {
			const metanode = await metanodeApi.postMetanode(payload);
			showToast({type: 'success', message: 'Метавершина успешно создана'});

			return metanode;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

export const updateMetanode = createAsyncThunk(
	'metanode/updateMetanode',
	async (payload: UpdateMetanodePayload): Promise<Option | undefined> => {
		try {
			const metanode = await metanodeApi.updateMetanode(payload);
			showToast({type: 'success', message: 'Метавершина успешно обновлена'});

			return metanode;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

export const deleteMetanode = createAsyncThunk(
	'metanode/deleteMetanode',
	async (params: {metanodeId: number}): Promise<number | undefined> => {
		try {
			await metanodeApi.deleteMetanode(params.metanodeId);
			showToast({type: 'success', message: 'Метавершина успешно удалена'});

			return params.metanodeId;
		} catch (e) {
			showErrorToast(e);
		}
	}
);

interface MetanodesState {
	metanodes: Option[];
}

const initialState: MetanodesState = {
	metanodes: []
};

// Then, handle actions in your reducers:
const metanodeSlice = createSlice({
	name: 'metanodes',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
	},
	extraReducers: (builder) => {
		builder.addCase(getMetanodesByModel.fulfilled, (state, action) => {
			state.metanodes = action.payload;
		});
		builder.addCase(createMetanode.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.metanodes.push(action.payload);
		});
		builder.addCase(updateMetanode.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.metanodes = state.metanodes.map((metanode) => {
				return metanode.id === action.payload?.id ? action.payload : metanode;
			});
		});
		builder.addCase(deleteMetanode.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}

			state.metanodes = state.metanodes.filter((metanode) => metanode.id !== action.payload);
		});
	}
});

export default metanodeSlice.reducer;
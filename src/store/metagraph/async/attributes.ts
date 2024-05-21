import {createAsyncThunk} from '@reduxjs/toolkit';

import attributesApi, {CreateAttributePayload, getAttributesParams, UpdateAttributePayload} from '@/api/attributes';
import {AttributeOption, Option} from '@/types/general.ts';
import showToast from '@/utils/showToast.ts';

export const getAttributesAsyncThunk = createAsyncThunk(
	'attributes/getAttribute',
	async (params: getAttributesParams): Promise<AttributeOption[]> => {
		return attributesApi.getAttributes(params);
	}
);

export const createAttributeAsyncThunk = createAsyncThunk(
	'attributes/createAttribute',
	async (payload: CreateAttributePayload): Promise<AttributeOption> => {
		const attributes = await attributesApi.postAttribute(payload);
		showToast({type: 'success', message: 'Атрибут успешно создан'});

		return attributes;
	}
);

export const updateAttributeAsyncThunk = createAsyncThunk(
	'attributes/updateAttribute',
	async (payload: UpdateAttributePayload): Promise<Option> => {
		const metanode = await attributesApi.updateAttribute(payload);
		showToast({type: 'success', message: 'Атрибут успешно обновлен'});

		return metanode;
	}
);

export const deleteAttributeAsyncThunk = createAsyncThunk(
	'attributes/deleteAttribute',
	async (params: {attributeId: number}): Promise<number> => {
		await attributesApi.deleteAttribute(params.attributeId);
		showToast({type: 'success', message: 'Атрибут успешно удален'});

		return params.attributeId;
	}
);
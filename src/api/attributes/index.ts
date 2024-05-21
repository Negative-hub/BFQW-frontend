import {instance} from '@/api/instance.ts';
import {AttributeOption, Option} from '@/types/general.ts';

export interface getAttributesParams {
	modelId: number;
}

async function getAttributes(params: getAttributesParams): Promise<AttributeOption[]> {
	const {data} = await instance.get<AttributeOption[]>(`/models/${params.modelId}/attributes`);
	return data;
}

export interface CreateAttributePayload {
	label: string;
	nodeId: number | null;
	metanodeId: number | null;
}

async function postAttribute(payload: CreateAttributePayload): Promise<AttributeOption> {
	const {data} = await instance.post<AttributeOption>('/attributes', payload);
	return data;
}

export interface UpdateAttributePayload {
	id: number;
	label: string;
	nodes: number[];
	metanodes: number[];
}

async function updateAttribute(payload: UpdateAttributePayload): Promise<Option> {
	const {data} = await instance.patch<Option>(`/attributes/${payload.id}`, payload);
	return data;
}

async function deleteAttribute(id: number): Promise<void> {
	await instance.delete(`/attributes/${id}`);
}

export default {
	getAttributes,
	postAttribute,
	updateAttribute,
	deleteAttribute
};

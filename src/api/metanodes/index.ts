import {instance} from '@/api/instance.ts';
import {Option} from '@/types/general.ts';

export interface GetMetanodesByModelParams {
	modelId: number;
}

async function getMetanodesByModel(params: GetMetanodesByModelParams): Promise<Option[]> {
	const {data} = await instance.get<Option[]>(`/models/${params.modelId}/metanodes`);
	return data;
}

export interface CreateMetanodePayload {
	label: string;
	attributes?: number[];
}

async function postMetanode(payload: CreateMetanodePayload): Promise<Option> {
	const {data} = await instance.post<Option>('/metanodes', payload);
	return data;
}

export interface UpdateMetanodePayload {
	id: number;
	label: string;
	attributes?: number[];
}

async function updateMetanode(payload: UpdateMetanodePayload): Promise<Option> {
	const {data} = await instance.patch<Option>(`/metanodes/${payload.id}`, payload);
	return data;
}

async function deleteMetanode(id: number): Promise<void> {
	await instance.delete(`/metanodes/${id}`);
}

export default {
	getMetanodesByModel,
	postMetanode,
	updateMetanode,
	deleteMetanode
};

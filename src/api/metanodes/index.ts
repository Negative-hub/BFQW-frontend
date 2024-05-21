import {instance} from '@/api/instance.ts';
import {MetagraphNode, Option} from '@/types/general.ts';

export interface getMetanodesParams {
	modelId: number;
}

async function getMetanodes(params: getMetanodesParams): Promise<Option[]> {
	const {data} = await instance.get<Option[]>(`/models/${params.modelId}/metanodes`);
	return data;
}

export interface CreateMetanodePayload {
	label: string;
	nodes: number[];
}

async function postMetanode(payload: CreateMetanodePayload): Promise<MetagraphNode[]> {
	const {data} = await instance.post<MetagraphNode[]>('/metanodes', payload);
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
	getMetanodes,
	postMetanode,
	updateMetanode,
	deleteMetanode
};

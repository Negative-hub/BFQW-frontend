import {instance} from '@/api/instance.ts';
import {MetagraphNode, Option} from '@/types/general.ts';
import {UpdatedMetanode} from '@/types/node.ts';

export interface GetMetanodesParams {
	modelId: number;
}

async function getMetanodes(params: GetMetanodesParams): Promise<Option[]> {
	const {data} = await instance.get<Option[]>(`/models/${params.modelId}/metanodes`);
	return data;
}

export interface GetMetanodeByIdParams {
	nodeIds: number[];
}

async function getMetanodeById(params: GetMetanodeByIdParams): Promise<UpdatedMetanode> {
	const {data} = await instance.get<UpdatedMetanode>('/nodes/metanode', {params});
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
	modelId: number;
	attributeIds: number[];
	nodeIds: number[];
}

async function updateMetanode(payload: UpdateMetanodePayload): Promise<MetagraphNode[]> {
	const {data} = await instance.patch<MetagraphNode[]>(`/metanodes/${payload.id}`, payload);
	return data;
}

async function deleteMetanode(id: number): Promise<void> {
	await instance.delete(`/metanodes/${id}`);
}

export default {
	getMetanodes,
	getMetanodeById,
	postMetanode,
	updateMetanode,
	deleteMetanode
};

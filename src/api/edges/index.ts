import {instance} from '@/api/instance.ts';
import {MetagraphEdge} from '@/types/general.ts';

export interface GetEdgesParams {
	modelId: number;
}

async function getEdges(params: GetEdgesParams): Promise<MetagraphEdge[]> {
	const {data} = await instance.get<MetagraphEdge[]>(`/models/${params.modelId}/edges`);
	return data;
}

export interface GetNodeByIdParams {
	edgeId: string;
}

async function getEdgeById(params: GetNodeByIdParams): Promise<MetagraphEdge> {
	const {data} = await instance.get<MetagraphEdge>(`/edges/${params.edgeId}`);
	return data;
}

export interface CreateEdgePayload {
	label: string;
	sourceId: number;
	targetId: number;
}

async function postEdge(payload: CreateEdgePayload): Promise<MetagraphEdge> {
	const {data} = await instance.post<MetagraphEdge>('/edges', payload);
	return data;
}

export interface UpdateEdgePayload {
	id: number;
	label: string;
	sourceId: number;
	targetId: number;
}

async function updateEdge(payload: UpdateEdgePayload): Promise<MetagraphEdge> {
	const {data} = await instance.patch<MetagraphEdge>(`/edges/${payload.id}`, payload);
	return data;
}

async function deleteEdge(id: number): Promise<void> {
	await instance.delete(`/edges/${id}`);
}

export default {
	getEdges,
	getEdgeById,
	postEdge,
	updateEdge,
	deleteEdge
};

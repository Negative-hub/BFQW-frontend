import {instance} from '@/api/instance.ts';
import {MetagraphNode} from '@/types/general.ts';
import {UpdatedNode} from '@/types/node.ts';

export interface GetNodesParams {
	modelId: number;
}

async function getNodes(params: GetNodesParams): Promise<MetagraphNode[]> {
	const {data} = await instance.get<MetagraphNode[]>(`/models/${params.modelId}/nodes`);
	return data;
}

export interface GetNodeByIdParams {
	nodeId: string;
}

async function getNodeById(params: GetNodeByIdParams): Promise<UpdatedNode> {
	const {data} = await instance.get<UpdatedNode>(`/nodes/${params.nodeId}`);
	return data;
}

export interface CreateNodePayload {
	label: string;
	modelId: number;
}

async function postNode(payload: CreateNodePayload): Promise<MetagraphNode> {
	const {data} = await instance.post<MetagraphNode>('/nodes', payload);
	return data;
}

export interface UpdateNodePayload {
	id: number;
	label: string;
	modelId: number;
	metanodeId: number | null;
	attributeIds: number[];
}

async function updateNode(payload: UpdateNodePayload): Promise<MetagraphNode> {
	const {data} = await instance.patch<MetagraphNode>(`/nodes/${payload.id}`, payload);
	return data;
}

async function deleteNode(id: number): Promise<void> {
	await instance.delete(`/nodes/${id}`);
}

export default {
	getNodes,
	getNodeById,
	postNode,
	updateNode,
	deleteNode
};

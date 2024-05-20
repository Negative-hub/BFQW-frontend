import {instance} from '@/api/instance.ts';
import {MetagraphNode} from '@/types/general.ts';

export interface CreateNodePayload {
	label: string;
	modelId: number;
	metanodeId?: number;
	attributes?: number[];
}

async function postNode(payload: CreateNodePayload): Promise<MetagraphNode> {
	const {data} = await instance.post<MetagraphNode>('/nodes', payload);
	return data;
}

export interface UpdateNodePayload {
	id: number;
	label: string;
	modelId: number;
	metanodeId?: number;
	attributes?: number[];
}

async function updateNode(payload: UpdateNodePayload): Promise<MetagraphNode> {
	const {data} = await instance.patch<MetagraphNode>(`/nodes/${payload.id}`, payload);
	return data;
}

async function deleteNode(id: number): Promise<void> {
	await instance.delete(`/nodes/${id}`);
}

export default {
	postNode,
	updateNode,
	deleteNode
};

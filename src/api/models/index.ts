import {instance} from '@/api/instance.ts';
import {Option} from '@/types/general.ts';

async function getModels(): Promise<Option[]> {
	const {data} = await instance.get<Option[]>('/models');
	return data;
}

export interface CreateModelPayload {
	name: string;
	// userId: number;
}

async function postModel(payload: CreateModelPayload): Promise<Option> {
	const {data} = await instance.post<Option>('/models', payload);
	return data;
}

async function deleteModel(id: number): Promise<void> {
	await instance.delete(`/models/${id}`);
}

export default {
	deleteModel,
	getModels,
	postModel
};

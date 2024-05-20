import {CreateNodePayload} from '@/api/nodes';

export interface CreateNodeDialogProps {
	isVisible: boolean;
	onHide: () => void;
	onCreate: (payload: CreateNodePayload) => void;
}

export interface CreateNodeProperties {
	label: string;
	modelId: number;
	metanodeId: number;
	attributes: number[];
}
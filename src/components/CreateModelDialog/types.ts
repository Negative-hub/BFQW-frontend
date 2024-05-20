import {CreateModelPayload} from '@/api/models';

export interface CreateModelDialogProps {
	isVisible: boolean;
	onHide: () => void;
	onCreate: (payload: CreateModelPayload) => void;
}
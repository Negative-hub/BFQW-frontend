export interface UpdateNodeDialogProps {
	nodeId: string;
	isVisible: boolean;
	onClose: () => void;
	onOpen: () => void;
}
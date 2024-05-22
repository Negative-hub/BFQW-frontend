export interface UpdateEdgeProps {
	edgeId: string;
	isVisible: boolean;
	onClose: () => void;
}

export interface UpdatedEdgeState {
	label: string;
	sourceId: string;
	targetId: string;
}
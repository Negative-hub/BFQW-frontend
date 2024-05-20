export interface Option {
	id: number;
	name: string;
}

export interface MetagraphNode {
	id: number;
	label: string;
	modelId: number;
	data: {metanode: string | 0};
}

export interface MetagraphEdge {
	id: number;
	source: number;
	target: number;
	label: string;
}
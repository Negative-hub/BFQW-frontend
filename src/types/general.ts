import {GraphEdge, GraphNode} from 'reagraph';

export interface Option {
	id: number;
	name: string;
}

export interface AttributeOption {
	id: number;
	label: string;
	nodeId: string | null;
	metanodeId: number | null;
}

export interface MetagraphNode extends GraphNode {
	id: string;
	label: string;
	data: {metanode: string | 0};
}

export interface MetagraphEdge extends GraphEdge {
	id: string;
	label: string;
	source: string;
	target: string;
}

export interface ErrorResponse {
	status: number,
	message: string
}

export interface UpdatedNode {
	id: number;
	label: string;
	attributeIds: number[];
	metanodeId: number | null;
}

export interface UpdatedMetanode {
	id: number;
	label: string;
	attributeIds: number[];
	nodeIds: string[];
}
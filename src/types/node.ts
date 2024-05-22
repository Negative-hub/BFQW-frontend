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
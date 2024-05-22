import {Button} from 'primereact/button';
import React, {useState} from 'react';
import {ClusterEventArgs, GraphCanvas, InternalGraphEdge, InternalGraphNode} from 'reagraph';

import Font from '@/assets/font/Anonymous.ttf';
import {UpdateEdgeDialog} from '@/components/UpdateEdgeDialog';
import {UpdateMetanodeDialog} from '@/components/UpdateMetanodeDialog';
import {UpdateNodeDialog} from '@/components/UpdateNodeDialog';
import {useDialog} from '@/hooks/useDialog.ts';
import {useStore} from '@/hooks/useStore.ts';
import {deleteModelAsyncThunk} from '@/store/model/async/models.ts';

export const Metagraph: React.FunctionComponent = () => {
	const {appDispatch, appSelector} = useStore();
	const selectedModel = appSelector((state) => state.models.selectedModel);
	const metagraphNodes = appSelector((state) => state.metagraph.nodes);
	const metagraphEdges = appSelector((state) => state.metagraph.edges);

	const [selectedNodeId, setSelectedNodeId] = useState<string>('');
	const [selectedEdgeId, setSelectedEdgeId] = useState<string>('');
	const [selectedCluster, setSelectedCluster] = useState<number[]>([]);

	const {
		isVisible: isVisibleUpdateNodeDialog,
		openDialog: onOpenUpdateNodeDialog,
		closeDialog: closeUpdateNodeDialog
	} = useDialog();

	const {
		isVisible: isVisibleUpdateEdgeDialog,
		openDialog: onOpenUpdateEdgeDialog,
		closeDialog: closeUpdateEdgeDialog
	} = useDialog();

	const {
		isVisible: isVisibleUpdateMetanodeDialog,
		openDialog: onOpenUpdateMetanodeDialog,
		closeDialog: closeUpdateMetanodeDialog
	} = useDialog();

	const onNodeClickHandler = (node: InternalGraphNode) => {
		setSelectedNodeId(node.id);
		onOpenUpdateNodeDialog();
	};

	const onCloseUpdateNodeDialog = () => {
		setSelectedNodeId('');
		closeUpdateNodeDialog();
	};

	const onEdgeClickHandler = (edge: InternalGraphEdge) => {
		setSelectedEdgeId(edge.id);
		onOpenUpdateEdgeDialog();
	};

	const onCloseUpdateEdgeDialog = () => {
		setSelectedEdgeId('');
		closeUpdateEdgeDialog();
	};

	const onClusterClickHandler = (cluster: ClusterEventArgs) => {
		setSelectedCluster(cluster.nodes.map((node) => +node.id));
		onOpenUpdateMetanodeDialog();
		closeUpdateNodeDialog();
	};

	const onCloseUpdateClusterDialog = () => {
		setSelectedCluster([]);
		closeUpdateMetanodeDialog();
	};

	const onClickDeleteMetagraph = () => {
		if (!selectedModel) {
			return;
		}

		appDispatch(deleteModelAsyncThunk({modelId: selectedModel.id}));
	};

	return (
		<article className="flex flex-col w-full">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">
					{selectedModel ? selectedModel.name : 'Выберите модель'}
				</h2>
				{
					!!selectedModel &&
					<Button
						className="text-sm"
						label="Удалить модель"
						severity="danger"
						size="small"
						onClick={onClickDeleteMetagraph}
					/>
				}
			</div>
			<div className="h-full relative left-0 bottom-0">
				{
					!!selectedModel &&
					<GraphCanvas
						nodes={metagraphNodes}
						edges={metagraphEdges}
						draggable={true}
						clusterAttribute="metanode"
						labelFontUrl={Font}
						layoutType="forceDirected2d"
						onNodeClick={onNodeClickHandler}
						onEdgeClick={onEdgeClickHandler}
						onClusterClick={onClusterClickHandler}
						cameraMode="pan"
					/>
				}
			</div>
			<UpdateNodeDialog
				nodeId={selectedNodeId}
				isVisible={isVisibleUpdateNodeDialog}
				onClose={onCloseUpdateNodeDialog}
			/>
			<UpdateEdgeDialog
				edgeId={selectedEdgeId}
				isVisible={isVisibleUpdateEdgeDialog}
				onClose={onCloseUpdateEdgeDialog}
			/>
			<UpdateMetanodeDialog
				cluster={selectedCluster}
				isVisible={isVisibleUpdateMetanodeDialog}
				onClose={onCloseUpdateClusterDialog}
			/>
		</article>
	);
};
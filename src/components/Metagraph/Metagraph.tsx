import {Button} from 'primereact/button';
import React, {useCallback, useState} from 'react';
import {GraphCanvas, InternalGraphNode} from 'reagraph';

import Font from '@/assets/font/Anonymous.ttf';
import {UpdateNodeDialog} from '@/components/UpdateNodeDialog';
import {useAppDispatch, useAppSelector} from '@/hooks/store.ts';
import {deleteModelAsyncThunk} from '@/store/model/async/models.ts';

export const Metagraph: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();
	const selectedModel = useAppSelector((s) => s.models.selectedModel);
	const metagraphNodes = useAppSelector((s) => s.metagraph.nodes);
	const metagraphEdges = useAppSelector((s) => s.metagraph.edges);

	const [selectedNodeId, setSelectedNodeId] = useState<string>('');
	const [isVisibleUpdatedNodeDialog, setIsVisibleUpdatedNodeDialog] = useState(false);

	const onShowNodeUpdateDialog = useCallback(
		() => setIsVisibleUpdatedNodeDialog(true),
		[]
	);

	const onHideNodeUpdateDialog = useCallback(
		() => {
			setSelectedNodeId('');
			setIsVisibleUpdatedNodeDialog(false);
		},
		[]
	);
	
	const onNodeClickHandler = (node: InternalGraphNode) => {
		setSelectedNodeId(node.id);
		onShowNodeUpdateDialog();
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
				<h2 className="text-2xl font-bold">
					Метаграф
				</h2>
				{
					!!selectedModel &&
					<Button
						label="Удалить модель"
						severity="danger"
						size="small"
						onClick={onClickDeleteMetagraph}
					/>
				}
			</div>
			<div className="h-full relative left-0 bottom-0">
				{
					selectedModel ?
						<GraphCanvas
							nodes={metagraphNodes}
							edges={metagraphEdges}
							draggable={true}
							clusterAttribute="metanode"
							labelFontUrl={Font}
							layoutType="forceDirected2d"
							onNodeClick={onNodeClickHandler}
						/> :
						<p className="text-center text-xl font-bold">Выберите модель</p>
				}
			</div>
			<UpdateNodeDialog
				nodeId={selectedNodeId}
				isVisible={isVisibleUpdatedNodeDialog}
				onClose={onHideNodeUpdateDialog}
				onOpen={onShowNodeUpdateDialog}
			/>
		</article>
	);
};
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import React, {useCallback, useEffect, useState} from 'react';

import {CreateEdgePayload} from '@/api/edges';
import {CreateEdgeState} from '@/components/CreateEdgeDialog/types.ts';
import {useAppDispatch, useAppSelector} from '@/hooks/store.ts';
import {createEdgesAsyncThunk} from '@/store/metagraph/async/edges.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateEdgeDialog: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();
	const selectedModel = useAppSelector((s) => s.models.selectedModel);
	const metagraphNodes = useAppSelector((s) => s.metagraph.nodes);

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [
		metagraphEdge,
		setMetagraphEdge
	] = useState<CreateEdgeState>({label: '', sourceId: 0, targetId: 0});

	useEffect(() => {
		if (isDialogVisible && selectedModel) {
			appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
		}
	}, [appDispatch, isDialogVisible, selectedModel]);

	const isCanCreateNode = metagraphEdge.label.trim() && metagraphEdge.sourceId && metagraphEdge.targetId;

	const onCreateEdge = async (payload: CreateEdgePayload) => {
		await appDispatch(createEdgesAsyncThunk(payload));
	};

	const onClickSave = async () => {
		if (!selectedModel) {
			showToast({type: 'error', message: 'Выберите модель'});
			return;
		}

		const payload: CreateEdgePayload = {
			label: metagraphEdge.label,
			sourceId: metagraphEdge.sourceId,
			targetId: metagraphEdge.targetId
		};

		await onCreateEdge(payload);
	};

	const onShowEdgeCreateDialog = useCallback(
		() => setIsDialogVisible(true),
		[]
	);

	const onHideEdgeCreateDialog = useCallback(
		() => setIsDialogVisible(false),
		[]
	);

	return (
		<>
			<Button
				label={'Создать ребро'}
				raised
				onClick={onShowEdgeCreateDialog}
			/>

			<Dialog
				header="Создать ребро"
				visible={isDialogVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={onHideEdgeCreateDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label htmlFor="edge-label">
						Название ребра*
						<InputText
							className="w-full"
							id="edge-label"
							value={metagraphEdge.label}
							onChange={(e) => setMetagraphEdge({...metagraphEdge, label: e.target.value})}
						/>
					</label>

					<label htmlFor="edge-source">
						Выберите источник*
						<Dropdown
							className="w-full"
							id="edge-source"
							options={metagraphNodes}
							value={metagraphEdge.sourceId}
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setMetagraphEdge({...metagraphEdge, sourceId: e.value})}
						/>
					</label>

					<label htmlFor="edge-target">
						Выберите цель*
						<Dropdown
							className="w-full"
							id="edge-target"
							options={metagraphNodes}
							value={metagraphEdge.targetId}
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setMetagraphEdge({...metagraphEdge, targetId: e.value})}
						/>
					</label>
				</div>

				<div className="mt-8 flex justify-between items-center gap-x-4">
					<Button
						className="w-full"
						label="Отменить"
						severity="danger"
						onClick={onHideEdgeCreateDialog}
					/>
					<Button
						className="w-full"
						label="Сохранить"
						disabled={!isCanCreateNode}
						onClick={onClickSave}
					/>
				</div>
			</Dialog>
		</>
	);
};
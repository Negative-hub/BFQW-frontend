import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import React, {useCallback, useEffect, useState} from 'react';

import {CreateEdgePayload} from '@/api/edges';
import {CreateEdgeState} from '@/components/CreateEdgeDialog/types.ts';
import {useDialog} from '@/hooks/useDialog.ts';
import {useStore} from '@/hooks/useStore.ts';
import {createEdgeAsyncThunk} from '@/store/metagraph/async/edges.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateEdgeDialog: React.FunctionComponent = () => {
	const {appDispatch, appSelector} = useStore();
	const {isVisible, openDialog, closeDialog} = useDialog();


	const initMetagraphEdgeState = useCallback(
		(): CreateEdgeState => ({label: '', sourceId: 0, targetId: 0}),
		[],
	);
	const [
		metagraphEdge,
		setMetagraphEdge
	] = useState<CreateEdgeState>(initMetagraphEdgeState());

	const selectedModel = appSelector((state) => state.models.selectedModel);
	const metagraphNodes = appSelector((state) => state.metagraph.nodes);

	const isCanCreateNode = metagraphEdge.label.trim() && metagraphEdge.sourceId && metagraphEdge.targetId;

	useEffect(() => {
		if (isVisible && selectedModel) {
			appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
		}
	}, [appDispatch, isVisible, selectedModel]);


	const onCreateEdge = async (payload: CreateEdgePayload) => {
		await appDispatch(createEdgeAsyncThunk(payload));
		setMetagraphEdge(initMetagraphEdgeState());
		closeDialog();
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

	return (
		<>
			<Button
				label={'Создать ребро'}
				raised
				onClick={openDialog}
			/>

			<Dialog
				header="Создать ребро"
				visible={isVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={closeDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label>
						Название ребра*
						<InputText
							className="w-full"
							value={metagraphEdge.label}
							onChange={(e) => setMetagraphEdge({...metagraphEdge, label: e.target.value})}
						/>
					</label>

					<label>
						Выберите источник*
						<Dropdown
							className="w-full"
							options={metagraphNodes}
							value={metagraphEdge.sourceId}
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setMetagraphEdge({...metagraphEdge, sourceId: e.value})}
						/>
					</label>

					<label>
						Выберите цель*
						<Dropdown
							className="w-full"
							options={metagraphNodes}
							value={metagraphEdge.targetId}
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setMetagraphEdge({...metagraphEdge, targetId: e.value})}
						/>
					</label>
				</div>

				<div className='mt-3'>
					<p>* — обязательные поля</p>
				</div>

				<div className="mt-8 flex justify-between items-center gap-x-4">
					<Button
						className="w-full"
						label="Отменить"
						severity="danger"
						onClick={closeDialog}
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
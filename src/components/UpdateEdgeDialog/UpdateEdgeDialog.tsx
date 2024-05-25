import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import React, {useEffect, useState} from 'react';

import edgesApi, {UpdateEdgePayload} from '@/api/edges';
import {UpdateEdgeProps} from '@/components/UpdateEdgeDialog/types.ts';
import {useStore} from '@/hooks/useStore.ts';
import {deleteEdgeAsyncThunk, updateEdgeAsyncThunk} from '@/store/metagraph/async/edges.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import {MetagraphEdge} from '@/types/general.ts';

export const UpdateEdgeDialog: React.FunctionComponent<UpdateEdgeProps> = (props: UpdateEdgeProps) => {
	const {appDispatch, appSelector} = useStore();

	const [
		updatedEdge,
		setUpdatedEdge
	] = useState<MetagraphEdge>({id: '', label: '', source: '', target: ''});

	const selectedModel = appSelector((state) => state.models.selectedModel);
	const metagraphNodes = appSelector((state) => state.metagraph.nodes);

	const isCanUpdateEdge = updatedEdge.label.trim() && updatedEdge.source && updatedEdge.target;

	useEffect(() => {
		if (!selectedModel || !props.isVisible) {
			return;
		}

		async function fetchEdgeById() {
			if (!props.edgeId) {
				return;
			}

			const response = await edgesApi.getEdgeById({edgeId: props.edgeId});
			setUpdatedEdge(response);
		}

		fetchEdgeById();
		appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
	}, [appDispatch, props.isVisible, selectedModel, props.edgeId]);

	const onUpdateEdge = async (payload: UpdateEdgePayload) => {
		await appDispatch(updateEdgeAsyncThunk(payload));
		props.onClose();
	};

	const onClickSave = async () => {
		const payload: UpdateEdgePayload = {
			id: +updatedEdge.id,
			label: updatedEdge.label,
			sourceId: +updatedEdge.source,
			targetId: +updatedEdge.target
		};

		await onUpdateEdge(payload);
	};

	const onDeleteEdge = async () => {
		await appDispatch(deleteEdgeAsyncThunk({edgeId: +props.edgeId}));
		props.onClose();
	};

	return (
		<Dialog
			header="Изменить ребро"
			visible={props.isVisible}
			style={{width: '30vw'}}
			draggable={false}
			onHide={props.onClose}
		>
			<div className="flex flex-col gap-y-4">
				<label htmlFor="edge-label">
					Название ребра*
					<InputText
						className="w-full"
						id="edge-label"
						value={updatedEdge.label}
						onChange={(e) => setUpdatedEdge({...updatedEdge, label: e.target.value})}
					/>
				</label>

				<label>
					Выберите источник*
					<Dropdown
						className="w-full"
						options={metagraphNodes}
						value={updatedEdge.source}
						optionLabel="label"
						optionValue="id"
						emptyMessage="Нет доступных вершин"
						onChange={(e) => setUpdatedEdge({...updatedEdge, source: e.value})}
					/>
				</label>

				<label>
					Выберите цель*
					<Dropdown
						className="w-full"
						options={metagraphNodes}
						value={updatedEdge.target}
						optionLabel="label"
						optionValue="id"
						emptyMessage="Нет доступных вершин"
						onChange={(e) => setUpdatedEdge({...updatedEdge, target: e.value})}
					/>
				</label>
			</div>

			<div className='mt-3'>
				<p>* - обязательные поля</p>
			</div>

			<div className="mt-8 flex justify-between items-center gap-x-4">
				<Button
					className="w-full"
					label="Удалить ребро"
					severity="danger"
					onClick={onDeleteEdge}
				/>
				<Button
					className="w-full"
					label="Сохранить"
					disabled={!isCanUpdateEdge}
					onClick={onClickSave}
				/>
			</div>
		</Dialog>
	);
};
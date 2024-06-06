import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {MultiSelect} from 'primereact/multiselect';
import React, {useEffect, useState} from 'react';

import metanodesApi, {UpdateMetanodePayload} from '@/api/metanodes';
import {UpdateMetanodeDialogProps} from '@/components/UpdateMetanodeDialog/types.ts';
import {useStore} from '@/hooks/useStore.ts';
import {getAttributesAsyncThunk} from '@/store/metagraph/async/attributes.ts';
import {
	deleteMetanodeAsyncThunk,
	getMetanodesAsyncThunk,
	updateMetanodeAsyncThunk
} from '@/store/metagraph/async/metanodes.ts';
import {UpdatedMetanode} from '@/types/general.ts';

export const UpdateMetanodeDialog: React.FunctionComponent<UpdateMetanodeDialogProps> = (props: UpdateMetanodeDialogProps) => {
	const {appSelector, appDispatch} = useStore();
	const selectedModel = appSelector((state) => state.models.selectedModel);
	const attributesOptions = appSelector((state) => state.metagraph.attributes);
	const nodesOptions = appSelector((state) => state.metagraph.nodes);

	const [
		updatedMetanode,
		setUpdatedMetanode
	] = useState<UpdatedMetanode>({
		id: 0,
		label: '',
		attributeIds: [],
		nodeIds: []
	});

	useEffect(() => {
		if (!selectedModel || !props.isVisible) {
			return;
		}

		async function fetchMetanodeById() {
			if (!props.cluster.length) {
				return;
			}

			const response = await metanodesApi.getMetanodeById({nodeIds: props.cluster});
			setUpdatedMetanode(response);
		}

		fetchMetanodeById();
		appDispatch(getAttributesAsyncThunk({modelId: selectedModel.id}));
		appDispatch(getMetanodesAsyncThunk({modelId: selectedModel.id}));
	}, [props.isVisible, props.cluster, appDispatch, selectedModel]);

	const isCanCreateMetanode = !!updatedMetanode.label.trim() && !!updatedMetanode.nodeIds.length;

	const onUpdateMetanode = async (payload: UpdateMetanodePayload) => {
		await appDispatch(updateMetanodeAsyncThunk(payload));
		props.onClose();
	};

	const onClickSave = async () => {
		if (!selectedModel) {
			return;
		}

		const payload: UpdateMetanodePayload = {
			id: updatedMetanode.id,
			label: updatedMetanode.label,
			modelId: selectedModel.id,
			attributeIds: updatedMetanode.attributeIds,
			nodeIds: updatedMetanode.nodeIds.map((node) => +node)
		};

		await onUpdateMetanode(payload);
	};

	const onDeleteMetanode = async () => {
		await appDispatch(deleteMetanodeAsyncThunk({metanodeId: updatedMetanode.id, cluster: props.cluster}));
		props.onClose();
	};

	return (
		<Dialog
			header="Изменить метавешину"
			visible={props.isVisible}
			style={{width: '30vw'}}
			draggable={false}
			onHide={props.onClose}
		>
			<div className="flex flex-col gap-y-4">
				<label>
					Название метавершины*
					<InputText
						className="w-full"
						value={updatedMetanode.label}
						onChange={(e) => setUpdatedMetanode({...updatedMetanode, label: e.target.value})}
					/>
				</label>

				<label>
					Вершины*
					<MultiSelect
						className="w-full"
						value={updatedMetanode.nodeIds}
						options={nodesOptions}
						optionLabel="label"
						optionValue="id"
						emptyMessage="Нет доступных вершин"
						onChange={(e) => setUpdatedMetanode({...updatedMetanode, nodeIds: e.value})}
					/>
				</label>

				<label>
					Аттрибуты метавершины
					<MultiSelect
						className="w-full"
						value={updatedMetanode.attributeIds}
						options={attributesOptions}
						optionLabel="label"
						optionValue="id"
						emptyMessage="Нет доступных атрибутов"
						onChange={(e) => setUpdatedMetanode({...updatedMetanode, attributeIds: e.value})}
					/>
				</label>
			</div>

			<div className='mt-3'>
				<p>* - обязательные поля</p>
			</div>

			<div className="mt-8 flex justify-between items-center gap-x-4">
				<Button
					className="w-full"
					label="Удалить метавершину"
					severity="danger"
					onClick={onDeleteMetanode}
				/>
				<Button
					className="w-full"
					label="Сохранить"
					disabled={!isCanCreateMetanode}
					onClick={onClickSave}
				/>
			</div>
		</Dialog>
	);
};
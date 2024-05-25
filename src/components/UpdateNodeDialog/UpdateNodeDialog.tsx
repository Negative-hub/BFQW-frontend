import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {MultiSelect} from 'primereact/multiselect';
import React, {useEffect, useState} from 'react';

import nodesApi, {UpdateNodePayload} from '@/api/nodes';
import {UpdateNodeDialogProps} from '@/components/UpdateNodeDialog/types.ts';
import {useStore} from '@/hooks/useStore.ts';
import {getAttributesAsyncThunk} from '@/store/metagraph/async/attributes.ts';
import {getMetanodesAsyncThunk} from '@/store/metagraph/async/metanodes.ts';
import {deleteNodeAsyncThunk, updateNodeAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import {UpdatedNode} from '@/types/general.ts';
import showToast from '@/utils/showToast.ts';

export const UpdateNodeDialog: React.FunctionComponent<UpdateNodeDialogProps> = (props: UpdateNodeDialogProps) => {
	const {appSelector, appDispatch} = useStore();
	const selectedModel = appSelector((state) => state.models.selectedModel);
	const attributesOptions = appSelector((state) => state.metagraph.attributes);
	const metanodesOptions = appSelector((state) => state.metagraph.metanodes);

	const [
		node,
		setNode
	] = useState<UpdatedNode>({
		id: 0,
		label: '',
		attributeIds: [],
		metanodeId: null
	});

	useEffect(() => {
		if (!selectedModel || !props.isVisible) {
			return;
		}

		async function fetchNodeById() {
			if (!props.nodeId) {
				return;
			}

			const response = await nodesApi.getNodeById({nodeId: props.nodeId});
			setNode(response);
		}

		fetchNodeById();
		appDispatch(getAttributesAsyncThunk({modelId: selectedModel.id}));
		appDispatch(getMetanodesAsyncThunk({modelId: selectedModel.id}));
	}, [props.isVisible, props.nodeId, appDispatch, selectedModel]);

	const isCanCreateNode = selectedModel && !!node?.label.trim();

	const onCreateNode = async (payload: UpdateNodePayload) => {
		await appDispatch(updateNodeAsyncThunk(payload));
		props.onClose();
	};

	const onClickSave = async () => {
		if (!selectedModel) {
			showToast({type: 'error', message: 'Выберите модель'});
			return;
		}

		const payload: UpdateNodePayload = {
			id: node.id,
			label: node.label,
			attributeIds: node.attributeIds,
			metanodeId: node.metanodeId,
			modelId: selectedModel.id
		};

		await onCreateNode(payload);
	};

	const onDeleteNode = async () => {
		await appDispatch(deleteNodeAsyncThunk({nodeId: +props.nodeId}));
		props.onClose();
	};

	return (
		<Dialog
			header="Изменить вершину"
			visible={props.isVisible}
			style={{width: '30vw'}}
			draggable={false}
			onHide={props.onClose}
		>
			<div className="flex flex-col gap-y-4">
				<label>
					Название вершины*
					<InputText
						className="w-full"
						value={node.label}
						onChange={(e) => setNode({...node, label: e.target.value})}
					/>
				</label>

				<label>
					Аттрибуты вершины
					<MultiSelect
						className="w-full"
						value={node.attributeIds}
						options={attributesOptions}
						optionLabel="label"
						optionValue="id"
						onChange={(e) => setNode({...node, attributeIds: e.value})}
					/>
				</label>

				<label>
					Метавершина
					<Dropdown
						className="w-full"
						value={node.metanodeId}
						options={metanodesOptions}
						optionLabel="name"
						optionValue="id"
						onChange={(e) => setNode({...node, metanodeId: e.value})}
					/>
				</label>
			</div>

			<div className='mt-3'>
				<p>* - обязательные поля</p>
			</div>

			<div className="mt-8 flex justify-between items-center gap-x-4">
				<Button
					className="w-full"
					label="Удалить вершину"
					severity="danger"
					onClick={onDeleteNode}
				/>
				<Button
					className="w-full"
					label="Сохранить"
					disabled={!isCanCreateNode}
					onClick={onClickSave}
				/>
			</div>
		</Dialog>
	);
};
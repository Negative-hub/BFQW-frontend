import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import React, {useCallback, useEffect, useState} from 'react';

import {CreateAttributePayload} from '@/api/attributes';
import {CreateAttributeState} from '@/components/CreateAttributeDialog/types.ts';
import {useAppDispatch, useAppSelector} from '@/hooks/store.ts';
import {createAttributeAsyncThunk} from '@/store/metagraph/async/attributes.ts';
import {getMetanodesAsyncThunk} from '@/store/metagraph/async/metanodes.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateAttributeDialog: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();

	const selectedModel = useAppSelector((s) => s.models.selectedModel);
	const metagraphNodes = useAppSelector((s) => s.metagraph.nodes);
	const metagraphMetanodes = useAppSelector((s) => s.metagraph.metanodes);

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [
		attribute,
		setAttribute
	] = useState<CreateAttributeState>({label: '', nodeId: null, metanodeId: null});

	useEffect(() => {
		if (isDialogVisible && selectedModel) {
			appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
			appDispatch(getMetanodesAsyncThunk({modelId: selectedModel.id}));
		}
	}, [appDispatch, isDialogVisible, selectedModel]);

	const isCanCreateAttribute = attribute.label.trim() && (attribute.nodeId || attribute.metanodeId);

	const onCreateAttribute = async (payload: CreateAttributePayload) => {
		await appDispatch(createAttributeAsyncThunk(payload));
	};

	const onClickSave = async () => {
		if (!selectedModel) {
			showToast({type: 'error', message: 'Выберите модель'});
			return;
		}

		const payload: CreateAttributePayload = {
			label: attribute.label,
			nodeId: attribute.nodeId ? +attribute.nodeId : null,
			metanodeId: attribute.metanodeId ? attribute.metanodeId : null
		};

		await onCreateAttribute(payload);
	};

	const onShowAttributeCreateDialog = useCallback(
		() => setIsDialogVisible(true),
		[]
	);

	const onHideAttributeCreateDialog = useCallback(
		() => setIsDialogVisible(false),
		[]
	);

	return (
		<>
			<Button
				label={'Создать атрибут'}
				raised
				onClick={onShowAttributeCreateDialog}
			/>
			<Dialog
				header="Создать атрибут"
				visible={isDialogVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={onHideAttributeCreateDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label htmlFor="attribute-label">
						Название атрибута* (уникальное)
						<InputText
							className="w-full"
							id="attribute-label"
							value={attribute.label}
							onChange={(e) => setAttribute({...attribute, label: e.target.value})}
						/>
					</label>

					<label htmlFor="attribute-node">
						Выберите вершину
						<Dropdown
							className="w-full"
							value={attribute.nodeId}
							options={metagraphNodes}
							id="attribute-node"
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setAttribute({...attribute, nodeId: e.value})}
						/>
					</label>

					<label htmlFor="attribute-metanode">
						Выберите метавершину
						<Dropdown
							className="w-full"
							value={attribute.metanodeId}
							options={metagraphMetanodes}
							id="attribute-metanode"
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setAttribute({...attribute, metanodeId: e.value})}
						/>
					</label>
				</div>

				<div className="mt-8 flex justify-between items-center gap-x-4">
					<Button
						className="w-full"
						label="Отменить"
						severity="danger"
						onClick={onHideAttributeCreateDialog}
					/>
					<Button
						className="w-full"
						label="Сохранить"
						disabled={!isCanCreateAttribute}
						onClick={onClickSave}
					/>
				</div>
			</Dialog>
		</>
	);
};
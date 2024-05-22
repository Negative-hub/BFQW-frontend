import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import React, {useEffect, useState} from 'react';

import {CreateAttributePayload} from '@/api/attributes';
import {CreateAttributeState} from '@/components/CreateAttributeDialog/types.ts';
import {useDialog} from '@/hooks/useDialog.ts';
import {useStore} from '@/hooks/useStore.ts';
import {createAttributeAsyncThunk} from '@/store/metagraph/async/attributes.ts';
import {getMetanodesAsyncThunk} from '@/store/metagraph/async/metanodes.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateAttributeDialog: React.FunctionComponent = () => {
	const {appDispatch, appSelector} = useStore();
	const {isVisible, openDialog, closeDialog} = useDialog();
	const [
		attribute,
		setAttribute
	] = useState<CreateAttributeState>({label: '', nodeId: null, metanodeId: null});

	const selectedModel = appSelector((state) => state.models.selectedModel);
	const metagraphNodes = appSelector((state) => state.metagraph.nodes);
	const metagraphMetanodes = appSelector((state) => state.metagraph.metanodes);

	const isCanCreateAttribute = attribute.label.trim() && (attribute.nodeId || attribute.metanodeId);

	useEffect(() => {
		if (isVisible && selectedModel) {
			appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
			appDispatch(getMetanodesAsyncThunk({modelId: selectedModel.id}));
		}
	}, [appDispatch, isVisible, selectedModel]);

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

	return (
		<>
			<Button
				label={'Создать атрибут'}
				raised
				onClick={openDialog}
			/>
			<Dialog
				header="Создать атрибут"
				visible={isVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={closeDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label>
						Название атрибута*
						<InputText
							className="w-full"
							value={attribute.label}
							onChange={(e) => setAttribute({...attribute, label: e.target.value})}
						/>
					</label>

					<label>
						Выберите вершину
						<Dropdown
							className="w-full"
							value={attribute.nodeId}
							options={metagraphNodes}
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setAttribute({...attribute, nodeId: e.value})}
						/>
					</label>

					<label>
						Выберите метавершину
						<Dropdown
							className="w-full"
							value={attribute.metanodeId}
							options={metagraphMetanodes}
							optionLabel="name"
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
						onClick={closeDialog}
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
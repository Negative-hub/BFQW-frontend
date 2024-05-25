import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {MultiSelect} from 'primereact/multiselect';
import React, {useCallback, useEffect, useState} from 'react';

import {CreateMetanodePayload} from '@/api/metanodes';
import {CreateMetanodeState} from '@/components/CreateMetanodeDialog/types.ts';
import {useDialog} from '@/hooks/useDialog.ts';
import {useStore} from '@/hooks/useStore.ts';
import {createMetanodeAsyncThunk} from '@/store/metagraph/async/metanodes.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateMetanodeDialog: React.FunctionComponent = () => {
	const {appSelector, appDispatch} = useStore();
	const {isVisible, openDialog, closeDialog} = useDialog();

	const initMetanodeState = useCallback(
		(): CreateMetanodeState => ({label: '', nodes: []}),
		[],
	);
	const [metanode, setMetanode] = useState<CreateMetanodeState>(initMetanodeState());

	const selectedModel = appSelector((state) => state.models.selectedModel);
	const metagraphNodes = appSelector((state) => state.metagraph.nodes);

	const isCanCreateMetanode = selectedModel && !!metanode.label.trim() && !!metanode.nodes.length;

	useEffect(() => {
		if (isVisible && selectedModel) {
			appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
		}
	}, [appDispatch, isVisible, selectedModel]);

	const onCreateMetanode = async (payload: CreateMetanodePayload) => {
		await appDispatch(createMetanodeAsyncThunk(payload));
		setMetanode(initMetanodeState());
		closeDialog();
	};

	const onClickSave = async () => {
		if (!selectedModel) {
			showToast({type: 'error', message: 'Выберите модель'});
			return;
		}

		const payload: CreateMetanodePayload = {
			label: metanode.label,
			nodes: metanode.nodes.map(node => +node)
		};

		await onCreateMetanode(payload);
	};

	return (
		<>
			<Button
				label={'Создать метавершину'}
				raised
				onClick={openDialog}
			/>
			<Dialog
				header="Создать метавершину"
				visible={isVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={closeDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label>
						Название метавершины*
						<InputText
							className="w-full"
							value={metanode.label}
							onChange={(e) => setMetanode({...metanode, label: e.target.value})}
						/>
					</label>

					<label>
						Выберите вершины
						<MultiSelect
							className="w-full"
							value={metanode.nodes}
							options={metagraphNodes}
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setMetanode({...metanode, nodes: e.value})}
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
						disabled={!isCanCreateMetanode}
						onClick={onClickSave}
					/>
				</div>
			</Dialog>
		</>
	);
};
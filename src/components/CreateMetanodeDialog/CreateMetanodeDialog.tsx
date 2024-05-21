import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {MultiSelect} from 'primereact/multiselect';
import React, {useCallback, useEffect, useState} from 'react';

import {CreateMetanodePayload} from '@/api/metanodes';
import {CreateMetanodeState} from '@/components/CreateMetanodeDialog/types.ts';
import {useAppDispatch, useAppSelector} from '@/hooks/store.ts';
import {createMetanodeAsyncThunk} from '@/store/metagraph/async/metanodes.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateMetanodeDialog: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();

	const selectedModel = useAppSelector((s) => s.models.selectedModel);
	const metagraphNodes = useAppSelector((s) => s.metagraph.nodes);

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [metanode, setMetanode] = useState<CreateMetanodeState>({label: '', nodes: []});

	useEffect(() => {
		if (isDialogVisible && selectedModel) {
			appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
		}
	}, [appDispatch, isDialogVisible, selectedModel]);

	const isCanCreateMetanode = selectedModel && !!metanode.label.trim() && !!metanode.nodes.length;

	const onCreateMetanode = async (payload: CreateMetanodePayload) => {
		await appDispatch(createMetanodeAsyncThunk(payload));
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

	const onShowMetanodeCreateDialog = useCallback(
		() => setIsDialogVisible(true),
		[]
	);

	const onHideMetanodeCreateDialog = useCallback(
		() => setIsDialogVisible(false),
		[]
	);

	return (
		<>
			<Button
				label={'Создать метавершину'}
				raised
				onClick={onShowMetanodeCreateDialog}
			/>
			<Dialog
				header="Создать метавершину"
				visible={isDialogVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={onHideMetanodeCreateDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label htmlFor="metanode-label">
						Название метавершины*
						<InputText
							className="w-full"
							id="metanode-label"
							value={metanode.label}
							onChange={(e) => setMetanode({...metanode, label: e.target.value})}
						/>
					</label>

					<label htmlFor="metanode-nodes">
						Выберите вершины
						<MultiSelect
							className="w-full"
							value={metanode.nodes}
							options={metagraphNodes}
							id="metanode-nodes"
							optionLabel="label"
							optionValue="id"
							onChange={(e) => setMetanode({...metanode, nodes: e.value})}
						/>
					</label>
				</div>

				<div className="mt-8 flex justify-between items-center gap-x-4">
					<Button
						className="w-full"
						label="Отменить"
						severity="danger"
						onClick={onHideMetanodeCreateDialog}
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
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import React, {useCallback, useState} from 'react';

import {CreateNodePayload} from '@/api/nodes';
import {useAppDispatch, useAppSelector} from '@/hooks/store.ts';
import {createNodeAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateNodeDialog: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();
	const selectedModel = useAppSelector((s) => s.models.selectedModel);

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [nodeLabel, setNodeLabel] = useState<string>('');

	const isCanCreateNode = selectedModel && !!nodeLabel.trim();

	const onCreateNode = async (payload: CreateNodePayload) => {
		await appDispatch(createNodeAsyncThunk(payload));
		setNodeLabel('');
	};

	const onClickSave = async () => {
		if (!selectedModel) {
			showToast({type: 'error', message: 'Выберите модель'});
			return;
		}

		const payload: CreateNodePayload = {
			label: nodeLabel,
			modelId: selectedModel.id
		};

		await onCreateNode(payload);
	};

	const onShowNodeCreateDialog = useCallback(
		() => setIsDialogVisible(true),
		[]
	);
	const onHideNodeCreateDialog = useCallback(
		() => setIsDialogVisible(false),
		[]
	);

	return (
		<>
			<Button
				label={'Создать вершину'}
				raised
				onClick={onShowNodeCreateDialog}
			/>

			<Dialog
				header="Создать вершину"
				visible={isDialogVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={onHideNodeCreateDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label htmlFor="node-label">
						Название вершины*
						<InputText
							className="w-full"
							id="node-label"
							value={nodeLabel}
							onChange={(e) => setNodeLabel(e.target.value)}
						/>
					</label>
				</div>

				<div className="mt-8 flex justify-between items-center gap-x-4">
					<Button
						className="w-full"
						label="Отменить"
						severity="danger"
						onClick={onHideNodeCreateDialog}
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
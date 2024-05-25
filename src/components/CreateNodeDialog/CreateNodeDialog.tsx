import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import React, {useState} from 'react';

import {CreateNodePayload} from '@/api/nodes';
import {useDialog} from '@/hooks/useDialog.ts';
import {useStore} from '@/hooks/useStore.ts';
import {createNodeAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import showToast from '@/utils/showToast.ts';

export const CreateNodeDialog: React.FunctionComponent = () => {
	const {appDispatch, appSelector} = useStore();
	const {isVisible, openDialog, closeDialog} = useDialog();
	const [nodeLabel, setNodeLabel] = useState('');

	const selectedModel = appSelector((state) => state.models.selectedModel);

	const isCanCreateNode = selectedModel && !!nodeLabel.trim();

	const onCreateNode = async (payload: CreateNodePayload) => {
		await appDispatch(createNodeAsyncThunk(payload));
		setNodeLabel('');
		closeDialog();
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

	return (
		<>
			<Button
				label={'Создать вершину'}
				raised
				onClick={openDialog}
			/>

			<Dialog
				header="Создать вершину"
				visible={isVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={closeDialog}
			>
				<div className="flex flex-col gap-y-4">
					<label>
						Название вершины*
						<InputText
							className="w-full"
							value={nodeLabel}
							onChange={(e) => setNodeLabel(e.target.value)}
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
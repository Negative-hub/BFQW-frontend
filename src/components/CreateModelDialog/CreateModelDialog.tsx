import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import React, {useCallback, useState} from 'react';

import {CreateModelPayload} from '@/api/models';
import {useAppDispatch} from '@/hooks/store.ts';
import {createModelAsyncThunk} from '@/store/model/async/models.ts';

export const CreateModelDialog: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();

	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const [modelName, setModelName] = useState('');

	const isCanSaveModel = !!modelName.trim().length;

	const onCreateModel = async (payload: CreateModelPayload) => {
		await appDispatch(createModelAsyncThunk(payload));
		setModelName('');
	};

	const onClickSaveHandler = async () => {
		await onCreateModel({name: modelName, userId: 1});
	};

	const onShowModelCreateDialog = useCallback(
		() => {
			setModelName('');
			setIsDialogVisible(true);
		},
		[]
	);

	const onHideModelCreateDialog = useCallback(
		() => setIsDialogVisible(false),
		[]
	);

	return (
		<>
			<Button
				label={'Создать модель'}
				raised
				onClick={onShowModelCreateDialog}
			/>

			<Dialog
				header="Создать модель"
				visible={isDialogVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={onHideModelCreateDialog}
			>
				<label htmlFor="model-label">
					Название модели*
				</label>
				<InputText
					className="w-full"
					id="model-label"
					value={modelName}
					onChange={(e) => setModelName(e.target.value)}
				/>
				<div className="mt-8 flex justify-between items-center gap-x-4">
					<Button
						className="w-full"
						label="Отменить"
						severity="danger"
						onClick={onHideModelCreateDialog}
					/>
					<Button
						className="w-full"
						label="Сохранить"
						disabled={!isCanSaveModel}
						onClick={onClickSaveHandler}
					/>
				</div>
			</Dialog>
		</>
	);
};
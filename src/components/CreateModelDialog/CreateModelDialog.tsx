import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import React, {useState} from 'react';

import {CreateModelPayload} from '@/api/models';
import {useDialog} from '@/hooks/useDialog.ts';
import {useStore} from '@/hooks/useStore.ts';
import {createModelAsyncThunk} from '@/store/model/async/models.ts';

export const CreateModelDialog: React.FunctionComponent = () => {
	const {appDispatch} = useStore();
	const {isVisible, openDialog, closeDialog} = useDialog();
	const [modelName, setModelName] = useState('');

	const isCanSaveModel = !!modelName.trim().length;

	const onCreateModel = async (payload: CreateModelPayload) => {
		await appDispatch(createModelAsyncThunk(payload));
		setModelName('');
	};

	const onClickSaveHandler = async () => {
		await onCreateModel({name: modelName});
	};

	return (
		<>
			<Button
				label={'Создать модель'}
				raised
				onClick={openDialog}
			/>

			<Dialog
				header="Создать модель"
				visible={isVisible}
				style={{width: '30vw'}}
				draggable={false}
				onHide={closeDialog}
			>
				<label>
					Название модели*
				</label>
				<InputText
					className="w-full"
					value={modelName}
					onChange={(e) => setModelName(e.target.value)}
				/>
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
						disabled={!isCanSaveModel}
						onClick={onClickSaveHandler}
					/>
				</div>
			</Dialog>
		</>
	);
};
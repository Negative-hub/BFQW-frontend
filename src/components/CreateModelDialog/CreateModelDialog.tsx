import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import React, {useState} from 'react';

import {CreateModelDialogProps} from '@/components/CreateModelDialog/types.ts';

export const CreateModelDialog: React.FunctionComponent<CreateModelDialogProps> = (props: CreateModelDialogProps) => {
	const {
		isVisible,
		onHide,
		onCreate
	} = props;

	const [name, setName] = useState('');

	return (
		<Dialog
			header="Создать модель"
			visible={isVisible}
			style={{width: '30vw'}}
			draggable={false}
			onHide={onHide}
		>
			<label htmlFor="model-label">
				Название модели
			</label>
			<InputText
				className="w-full"
				id="model-label"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<div className="mt-8 flex justify-between items-center gap-x-4">
				<Button
					className="w-full"
					label="Отменить"
					severity="danger"
					onClick={onHide}
				/>
				<Button
					className="w-full"
					label="Сохранить"
					disabled={!name.trim().length}
					onClick={() => onCreate({name, userId: 1})}
				/>
			</div>
		</Dialog>
	);
};
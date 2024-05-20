import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {MultiSelect} from 'primereact/multiselect';
import React, {useState} from 'react';

import {CreateNodePayload} from '@/api/nodes';
import {CreateNodeDialogProps, CreateNodeProperties} from '@/components/CreateNodeDialog/types.ts';
import {useAppSelector} from '@/hooks/store.ts';

export const CreateNodeDialog: React.FunctionComponent<CreateNodeDialogProps> = (props: CreateNodeDialogProps) => {
	const {
		isVisible,
		onHide,
		onCreate
	} = props;

	const modelsOptions = useAppSelector((selector) => selector.models.models);

	const [node, setNode] = useState<CreateNodeProperties>({
		label: '',
		modelId: 0,
		metanodeId: 0,
		attributes: []
	});

	const isDisabledCreateButton = !node.label.trim() || !node.modelId;

	function onClickSave() {
		const payload: CreateNodePayload = {
			label: node.label,
			modelId: node.modelId
		};

		if (node.metanodeId) {
			payload.metanodeId = node.metanodeId;
		}

		if (node.attributes.length) {
			payload.attributes = node.attributes;
		}

		onCreate(payload);
	}

	return (
		<Dialog
			header="Создать вершину"
			visible={isVisible}
			style={{width: '30vw'}}
			draggable={false}
			onHide={onHide}
		>
			<div className="flex flex-col gap-y-4">
				<label htmlFor="node-label">
					Название вершины
					<InputText
						className="w-full"
						id="node-label"
						value={node.label}
						onChange={(e) => setNode({...node, label: e.target.value})}
					/>
				</label>

				<label htmlFor="model-node">
					Выберите модель
					<Dropdown
						className="w-full"
						optionValue="id"
						optionLabel="name"
						emptyMessage="Нет доступных моделей"
						id="model-node"
						options={modelsOptions}
						value={node.modelId}
						onChange={(e) => setNode({...node, modelId: e.value})}
					/>
				</label>

				<label htmlFor="metanode-node">
					Выберите метавершину
					<Dropdown
						className="w-full"
						optionValue="id"
						optionLabel="name"
						emptyMessage="Нет доступных метавершин"
						id="metanode-node"
						options={modelsOptions}
						value={node.metanodeId}
						onChange={(e) => setNode({...node, metanodeId: e.value})}
					/>
				</label>

				<label htmlFor="attributes-node">
					Выберите атрибуты
					<MultiSelect
						className="w-full"
						optionValue="id"
						optionLabel="name"
						emptyMessage="Нет доступных атрибутов"
						id="attributes-node"
						options={modelsOptions}
						value={node.attributes}
						onChange={(e) => setNode({...node, attributes: e.value})}
					/>
				</label>
			</div>

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
					disabled={isDisabledCreateButton}
					onClick={onClickSave}
				/>
			</div>
		</Dialog>
	);
};
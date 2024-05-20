import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import React, {useCallback, useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';

import {CreateModelPayload} from '@/api/models';
import {CreateNodePayload} from '@/api/nodes';
import {CreateModelDialog} from '@/components/CreateModelDialog';
import {CreateNodeDialog} from '@/components/CreateNodeDialog';
import {useAppDispatch, useAppSelector} from '@/hooks/store.ts';
import {createNode} from '@/store/metagraph.slice.ts';
import {createModel, fetchUserModels} from '@/store/models.slice.ts';

export const App: React.FunctionComponent = () => {
	const appDispatch = useAppDispatch();

	const modelsOptions = useAppSelector((selector) => selector.models.models);
	const [selectedModel, setSelectedModel] = useState<number>();

	/* ------------  Models state  ----------------*/
	const [isModelCreateDialogVisible, setIsModelCreateDialogVisible] = useState(false);

	/* ------------  Nodes state  ----------------*/
	const [isNodeCreateDialogVisible, setIsNodeCreateDialogVisible] = useState(false);

	useEffect(() => {
		appDispatch(fetchUserModels({userId: 1}));
	}, [appDispatch]);

	/* ------------ Models ------------- */
	const onShowModelCreateDialog = useCallback(
		() => setIsModelCreateDialogVisible(true),
		[]
	);
	const onHideModelCreateDialog = useCallback(
		() => setIsModelCreateDialogVisible(false),
		[]
	);
	const onCreateModel = useCallback(
		(payload: CreateModelPayload) => appDispatch(createModel(payload)),
		[appDispatch]
	);

	// ------------ Nodes ------------- //

	const onShowNodeCreateDialog = useCallback(
		() => setIsNodeCreateDialogVisible(true),
		[]
	);
	const onHideNodeCreateDialog = useCallback(
		() => setIsNodeCreateDialogVisible(false),
		[]
	);
	const onCreateNode = useCallback(
		(payload: CreateNodePayload) => appDispatch(createNode(payload)),
		[appDispatch]
	);
	// const nodes = [
	// 	{id: '1', label: '1', data: {metanode: 'V11'}},
	// 	{id: '2', label: '2', data: {metanode: 'V11'}},
	// 	{id: '3', label: '3', data: {metanode: 'V11'}},
	// 	{id: '4', label: '4', data: {metanode: 'V12'}},
	// 	{id: '5', label: '5', data: {metanode: 'V12'}},
	// 	{id: '6', label: '6', data: {metanode: 0}}
	// ];
	//
	// const edges = [
	// 	{
	// 		source: '1',
	// 		target: '2',
	// 		id: '1-2',
	// 		label: 'e1'
	// 	},
	// 	{
	// 		source: '2',
	// 		target: '1',
	// 		id: '2-1',
	// 		label: 'e2-1'
	// 	},
	// 	{
	// 		source: '2',
	// 		target: '3',
	// 		id: '2-3',
	// 		label: 'e2'
	// 	},
	// 	{
	// 		source: '3',
	// 		target: '1',
	// 		id: '3-1',
	// 		label: 'e3'
	// 	},
	// 	{
	// 		source: '3',
	// 		target: '5',
	// 		id: '3-5',
	// 		label: 'e5'
	// 	},
	// 	{
	// 		source: '4',
	// 		target: '5',
	// 		id: '4-5',
	// 		label: 'e6'
	// 	},
	// 	{
	// 		source: '2',
	// 		target: '4',
	// 		id: '2-4',
	// 		label: 'e4'
	// 	}
	// ];

	return (
		<section className="p-6 h-full flex flex-col overflow-hidden">
			<ToastContainer
				position="top-left"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<header className="flex justify-center">
				<h1 className="text-center text-2xl font-bold">
					Ввод и редактирование метаграфовых данных
				</h1>
			</header>
			<main className="overflow-hidden h-full flex gap-10">
				<aside className="px-1 overflow-y-scroll flex flex-col w-1/5 [&::-webkit-scrollbar]:hidden">
					<h2 className="text-xl font-bold">
						Модели
					</h2>
					<Dropdown
						value={selectedModel}
						options={modelsOptions}
						optionValue="id"
						optionLabel="name"
						emptyMessage="Нет доступных моделей"
						onChange={(e) => setSelectedModel(e.value as number)}
					/>
					<h2 className="mt-4 text-xl font-bold">
						Действия
					</h2>
					<div className="flex flex-col gap-y-3">
						<Button
							label={'Создать модель'}
							raised
							onClick={onShowModelCreateDialog}
						/>
						<Button
							label={'Создать вершину'}
							raised
							onClick={onShowNodeCreateDialog}
						/>
						<Button
							label={'Создать метавершину'}
							raised
						/>
						<Button
							label={'Создать атрибуты'}
							raised
						/>
						<Button
							label={'Создать ребро'}
							raised
						/>
					</div>
				</aside>
				<article className="flex flex-col w-full">
					<h2 className="text-xl font-bold">
						Метаграф
					</h2>
					<div className="h-full relative left-0 bottom-0">
						{/*<GraphCanvas*/}
						{/*	nodes={nodes}*/}
						{/*	edges={edges}*/}
						{/*	draggable={true}*/}
						{/*	clusterAttribute="metanode"*/}
						{/*/>*/}
					</div>
				</article>
			</main>

			<CreateModelDialog
				isVisible={isModelCreateDialogVisible}
				onHide={onHideModelCreateDialog}
				onCreate={onCreateModel}
			/>
			<CreateNodeDialog
				isVisible={isNodeCreateDialogVisible}
				onHide={onHideNodeCreateDialog}
				onCreate={onCreateNode}
			/>
		</section>
	);
};

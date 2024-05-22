import {Dropdown} from 'primereact/dropdown';
import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {CreateAttributeDialog} from '@/components/CreateAttributeDialog';
import {CreateEdgeDialog} from '@/components/CreateEdgeDialog/CreateEdgeDialog.tsx';
import {CreateMetanodeDialog} from '@/components/CreateMetanodeDialog';
import {CreateModelDialog} from '@/components/CreateModelDialog';
import {CreateNodeDialog} from '@/components/CreateNodeDialog';
import {Metagraph} from '@/components/Metagraph/Metagraph.tsx';
import {useStore} from '@/hooks/useStore.ts';
import {getEdgesAsyncThunk} from '@/store/metagraph/async/edges.ts';
import {getNodesAsyncThunk} from '@/store/metagraph/async/nodes.ts';
import {fetchModelsAsyncThunk} from '@/store/model/async/models.ts';
import {setSelectedModel} from '@/store/model/model.slice.ts';


export const App: React.FunctionComponent = () => {
	const {appDispatch, appSelector} = useStore();

	const modelsOptions = appSelector((state) => state.models.models);
	const selectedModel = appSelector((state) => state.models.selectedModel);

	useEffect(() => {
		appDispatch(fetchModelsAsyncThunk());
	}, [appDispatch]);

	useEffect(() => {
		if (!selectedModel) {
			return;
		}

		appDispatch(getNodesAsyncThunk({modelId: selectedModel.id}));
		appDispatch(getEdgesAsyncThunk({modelId: selectedModel.id}));
	}, [selectedModel, appDispatch]);

	return (
		<section className="p-6 h-full flex flex-col overflow-hidden">
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
						optionLabel="name"
						emptyMessage="Нет доступных моделей"
						onChange={(e) => appDispatch(setSelectedModel(e.value))}
					/>
					<h2 className="mt-4 text-xl font-bold">
						Действия
					</h2>
					<div className="flex flex-col gap-y-3">
						<CreateModelDialog />
						<CreateNodeDialog />
						<CreateMetanodeDialog />
						<CreateAttributeDialog />
						<CreateEdgeDialog />
					</div>
				</aside>
				<Metagraph />
			</main>

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
		</section>
	);
};

import {useDispatch, useSelector} from 'react-redux';

import type {AppDispatch, RootState} from '@/store/store.ts';

export const useStore = () => {
	const useAppDispatch = useDispatch.withTypes<AppDispatch>();
	const useAppSelector = useSelector.withTypes<RootState>();

	return {
		appDispatch: useAppDispatch(),
		appSelector: useAppSelector
	};
};

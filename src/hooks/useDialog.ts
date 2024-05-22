import {useCallback, useState} from 'react';

export const useDialog = () => {
	const [isVisible, setIsVisible] = useState(false);

	const openDialog = useCallback(() => setIsVisible(true), []);
	const closeDialog = useCallback(() => setIsVisible(false), []);

	return {
		isVisible,
		openDialog,
		closeDialog
	};
};
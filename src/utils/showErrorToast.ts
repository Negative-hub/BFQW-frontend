import {isAxiosError} from 'axios';
import {toast} from 'react-toastify';

import {ErrorResponse} from '@/types/general.ts';

export default function(error: unknown) {
	if (!isAxiosError(error)) {
		toast.error('Неизвестная ошибка');
		return;
	}

	if (!error.response) {
		toast.error('Ошибка в API запросе');
		return;
	}

	const errorResponse = error.response.data as ErrorResponse;
	toast.error(errorResponse.message, {autoClose: 2000});
}
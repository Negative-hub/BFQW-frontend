import axios from 'axios';

import showErrorToast from '@/utils/showErrorToast.ts';

const instance = axios.create({
	baseURL: '/api'
});

instance.interceptors.response.use(
	(response) => response,
	(error) => showErrorToast(error)
);

export {instance};
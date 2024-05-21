import {toast} from 'react-toastify';

export interface IToastParams {
	type: 'success' | 'warning' | 'error';
	message: string;
}

export default function(params: IToastParams) {
	toast[params.type](params.message);
}
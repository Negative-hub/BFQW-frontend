import {toast} from 'react-toastify';

export interface IToastParams {
	type: 'success' | 'warning';
	message: string;
}

export default function(params: IToastParams) {
	toast[params.type](params.message);
}
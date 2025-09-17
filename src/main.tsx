import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {store} from '@/store/store.ts';

import {App} from './App';

import './index.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'react-toastify/dist/ReactToastify.css';
//console.log()
ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<App />
	</Provider>
);

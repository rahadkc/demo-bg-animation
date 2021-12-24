import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import store from './store';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'slick-carousel/slick/slick.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/default.css';
import './assets/css/style.scss';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter >
			<App />
		</BrowserRouter>
		<ToastContainer
			position="bottom-right"
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();

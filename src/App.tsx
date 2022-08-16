import { Provider } from 'react-redux';
import Layout from './layout';
import AppRoutes from './router';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<Layout>
				<AppRoutes />
			</Layout>
		</Provider>
	);
}

export default App;

import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => {
	// TODO: Create a suspense fallback component for main content

	return (
		<Suspense fallback='Loading...'>
			<Routes>
				{routes.map(route => (
					<Route key={route.name} path={route.path} element={route.element} />
				))}
			</Routes>
		</Suspense>
	);
};
export default AppRoutes;

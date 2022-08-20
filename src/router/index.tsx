import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => {
	// TODO: Create a suspense fallback component for main content

	const appRoutes = useRoutes(routes);

	return <Suspense fallback='Loading...'>{appRoutes}</Suspense>;
};
export default AppRoutes;

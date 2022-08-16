import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/Home'));
const TeamsPage = lazy(() => import('../pages/Teams'));

const routes = [
	{
		path: '/',
		name: 'home',
		element: <HomePage />,
	},
	{
		path: '/teams',
		name: 'teams',
		element: <TeamsPage />,
	},
	{
		path: '*',
		name: 'not-found',
		element: <div>Not Found</div>, // TODO create a 404 page
	},
];

export default routes;

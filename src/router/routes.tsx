import { lazy } from 'react';
import { RoutesProps } from '@/types';
import { RiTeamLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { GiPlayerPrevious } from 'react-icons/gi';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/Home'));
const TeamsPage = lazy(() => import('../pages/Teams'));
const FormationsPage = lazy(() => import('../pages/Formations'));

type RouterPropsObject = RouteObject & RoutesProps;

const routes: RouterPropsObject[] = [
	{
		path: '/',
		element: <HomePage />,
		name: 'Home',
		icon: <AiOutlineHome size='1em' />,
		aside: true,
	},
	{
		path: '/teams',
		element: <TeamsPage />,
		name: 'Equipos',
		icon: <RiTeamLine size='1em' />,
		aside: true,
	},
	{
		path: '/formations',
		element: <FormationsPage />,
		name: 'Formacion',
		icon: <GiPlayerPrevious size='1em' />,
		aside: true,
	},
	{
		path: '*',
		element: <div>Not Found</div>, // TODO create a 404 page
		name: 'Not Found',
		icon: null,
		aside: false,
	},
];

export default routes;

// function App() {
//   let element = useRoutes([
//     {
//       path: "/",
//       element: <Dashboard />,
//       children: [
//         {
//           path: "messages",
//           element: <DashboardMessages />,
//         },
//         { path: "tasks", element: <DashboardTasks /> },
//       ],
//     },
//     { path: "team", element: <AboutPage /> },
//   ]);

//   return element;
// }

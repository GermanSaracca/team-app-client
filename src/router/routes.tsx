import { lazy } from 'react';
import { RoutesProps } from '@/types';
import { RiTeamLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { GiPlayerPrevious } from 'react-icons/gi';
import { RouteObject } from 'react-router-dom';
import DesktopOnlyPage from '@/components/DesktopOnlyPage';

const HomePage = lazy(() => import('../pages/Home'));
const PlayersPage = lazy(() => import('../pages/Players'));
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
		path: '/players',
		element: <PlayersPage />,
		name: 'Jugadores',
		icon: <RiTeamLine size='1em' />,
		aside: true,
	},
	{
		path: '/formations',
		element: (
			<DesktopOnlyPage>
				<FormationsPage />
			</DesktopOnlyPage>
		),
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

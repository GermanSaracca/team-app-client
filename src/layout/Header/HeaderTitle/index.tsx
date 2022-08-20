import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '@/router/routes';

const HeaderTitle = () => {
	const { pathname } = useLocation();
	const [headerTitle, setHeaderTitle] = useState<string>('');

	// Select name of route wich pathname matchs with current pathname
	useEffect(() => {
		const title = routes.find(route => route.path === pathname)?.name;
		setHeaderTitle(title ?? '');
	}, [pathname]);

	return <h3>{headerTitle}</h3>;
};
export default HeaderTitle;

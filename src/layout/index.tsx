import { ReactNode } from 'react';

import AsideNavigation from './AsideNavigation';
import style from './index.module.scss';

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className={style.layout_wrapper}>
			<AsideNavigation />
			<main className={style.main_wrapper}>{children}</main>
		</div>
	);
};

export default Layout;

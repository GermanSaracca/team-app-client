import { Profiler, ReactNode } from 'react';

import AsideNavigation from './AsideNavigation';
import Header from './Header';
import style from './index.module.scss';
import MobileNavigation from './MobileNavigation';

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className={style.layout_wrapper}>
			{/* renders exact and above 1200px */}
			<AsideNavigation />
			{/* renders only below 1200px */}
			<MobileNavigation />
			<Header />
			<Profiler
				id='main'
				onRender={(...data) => {
					console.log(data);
				}}
			>
				<main className={style.main_wrapper}>{children}</main>
			</Profiler>
		</div>
	);
};

export default Layout;

import { ASIDE_BREAKPOINT } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useWindowSize from '@/hooks/useWindowSize';
import routes from '@/router/routes';
import { toggleMenu } from '@/store/slices/layout';
import { NavLink } from 'react-router-dom';
import MobileMenuBtnToggle from '../MobileMenuBtnToggle';
import style from './index.module.scss';

const MobileNavigation = () => {
	const { width } = useWindowSize();
	const { mobileMenuOpen } = useAppSelector(state => state.layout);
	const dispatch = useAppDispatch();

	if (mobileMenuOpen && width && width < ASIDE_BREAKPOINT) {
		return (
			<div className={style.mobile_navigation}>
				<div className={style.close_btn}>
					<MobileMenuBtnToggle />
				</div>
				<ul>
					{routes.map(({ name, path, icon, aside }) => {
						if (!aside) {
							// If the route has not aside property on true, don't render it on the aside 👌
							return null;
						}

						return (
							<li key={name}>
								<NavLink
									to={path}
									className={({ isActive }) => (isActive ? style.active_nav_link : style.nav_link)}
									onClick={() => dispatch(toggleMenu())}
								>
									<span className={style.link_icon}>{icon}</span>
									<span className={style.link_text}>{name}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	return null;
};
export default MobileNavigation;

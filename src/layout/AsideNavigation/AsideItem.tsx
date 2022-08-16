// import NavLink from '@/components/NavLink';
import { NavLink } from 'react-router-dom';
import { AsideItemTypes } from '@/types';
import style from './AsideItem.module.scss';

interface Props extends AsideItemTypes {
	shrinked: boolean;
}

export const AsideItem = ({ to, text, icon, shrinked }: Props) => {
	return (
		<li className={`${style.aside_item} ${shrinked ? style.shrinked : ''}`}>
			<NavLink
				to={to}
				className={({ isActive }) => (isActive ? style.active_nav_link : style.nav_link)}>
				<span className={style.icon_wrapper} data-tooltip={text}>
					{icon}
				</span>
				{!shrinked && <span className={style.link_text}>{text}</span>}
			</NavLink>
		</li>
	);
};

// import NavLink from '@/components/NavLink';
import { NavLink } from 'react-router-dom';
import { AsideItemType } from '@/types';
import style from './AsideItem.module.scss';

interface Props extends AsideItemType {
	shrinked: boolean;
}

export const AsideItem = ({ path, name, icon, shrinked }: Props) => {
	return (
		<li className={`${style.aside_item} ${shrinked ? style.shrinked : ''}`}>
			<NavLink
				to={path}
				className={({ isActive }) => (isActive ? style.active_nav_link : style.nav_link)}
			>
				<span className={style.link_icon} data-tooltip={name}>
					{icon}
				</span>
				{!shrinked && <span className={style.link_text}>{name}</span>}
			</NavLink>
		</li>
	);
};

import { useState } from 'react';
import style from './index.module.scss';
import { RiTeamLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { AsideItemTypes } from '@/types';
import { AsideItem } from './AsideItem';

const Links: AsideItemTypes[] = [
	{
		text: 'Home',
		to: '/',
		icon: <AiOutlineHome size='1em' />,
	},
	{
		text: 'Teams',
		to: '/teams',
		icon: <RiTeamLine size='1em' />,
	},
];

const AsideNavigation = () => {
	const [shrink, setShrink] = useState<boolean>(false);

	return (
		<aside className={`${style.aside} ${shrink && style.shrink}`}>
			{/* Button Hide below 1200px */}
			<button className={style.shrink_btn} onClick={() => setShrink(s => !s)}>
				<div>
					{shrink ? (
						<span>
							<BsChevronDoubleRight size='1rem' />
						</span>
					) : (
						<span>
							<BsChevronDoubleLeft size='1.5rem' />
						</span>
					)}
				</div>
			</button>
			<nav>
				<ul>
					{Links.map(({ text, to, icon }) => (
						<AsideItem to={to} text={text} icon={icon} key={text} shrinked={shrink} />
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default AsideNavigation;

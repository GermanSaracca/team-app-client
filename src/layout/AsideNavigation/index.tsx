import { useState } from 'react';
import routes from '@/router/routes';
import style from './index.module.scss';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { AsideItem } from './AsideItem';

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
					{routes.map(({ name, path, icon, aside }) => {
						if (!aside) {
							// If the route has not aside on true, don't render it on the aside 😂
							return null;
						}

						return <AsideItem path={path} name={name} icon={icon} key={name} shrinked={shrink} />;
					})}
				</ul>
			</nav>
		</aside>
	);
};

export default AsideNavigation;

import styles from './index.module.scss';
import HeaderTitle from './HeaderTitle';
import SoundToggle from './SoundToggle';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { toggleMenu } from '@/store/slices/layout';
import useWindowSize from '@/hooks/useWindowSize';
import { ASIDE_BREAKPOINT } from '@/constants';
const Header = () => {
	const dispatch = useAppDispatch();
	const { width } = useWindowSize();
	return (
		<header className={styles.main_header}>
			<HeaderTitle />
			<div className={`ml-auto ${width && width < ASIDE_BREAKPOINT ? 'mr-6' : ' '}`}>
				<SoundToggle />
			</div>
			{width && width < ASIDE_BREAKPOINT && (
				<button onClick={() => dispatch(toggleMenu())}>
					<GiHamburgerMenu />
				</button>
			)}
		</header>
	);
};
export default Header;

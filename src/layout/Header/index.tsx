import styles from './index.module.scss';
import HeaderTitle from './HeaderTitle';
import SoundToggle from './SoundToggle';
import useWindowSize from '@/hooks/useWindowSize';
import { ASIDE_BREAKPOINT } from '@/constants';
import MobileMenuBtnToggle from '../MobileMenuBtnToggle';

const Header = () => {
	const { width } = useWindowSize();
	return (
		<header className={styles.main_header}>
			<HeaderTitle />
			<div className={styles.sound_toggle_wrapper}>
				<SoundToggle />
			</div>
			{width && width < ASIDE_BREAKPOINT && <MobileMenuBtnToggle />}
		</header>
	);
};
export default Header;

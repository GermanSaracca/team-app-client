import styles from './index.module.scss';
import HeaderTitle from './HeaderTitle';
import SoundToggle from './SoundToggle';

const Header = () => {
	return (
		<header className={styles.main_header}>
			<HeaderTitle />
			<SoundToggle />
		</header>
	);
};
export default Header;

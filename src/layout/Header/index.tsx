import styles from './index.module.scss';
import HeaderTitle from './HeaderTitle';

const Header = () => {
	return (
		<header className={styles.main_header}>
			<HeaderTitle />
		</header>
	);
};
export default Header;

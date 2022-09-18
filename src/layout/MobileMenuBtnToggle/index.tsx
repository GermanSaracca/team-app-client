import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toggleMenu } from '@/store/slices/layout';
import { MdClear, MdMenu } from 'react-icons/md';
import style from './index.module.scss';

const MobileMenuBtnToggle = () => {
	const dispatch = useAppDispatch();
	const { mobileMenuOpen } = useAppSelector(state => state.layout);

	return (
		<button
			className={style.mobile_menu_btn_toggle}
			onClick={() => dispatch(toggleMenu())}
			title='close menu'
		>
			{mobileMenuOpen ? <MdClear size={30} /> : <MdMenu size={30} />}
		</button>
	);
};
export default MobileMenuBtnToggle;

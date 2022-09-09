import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toggleSound } from '@/store/slices/sound';
import classNames from 'classnames';
import { AiFillSound } from 'react-icons/ai';
import style from './index.module.scss';

const SoundToggle = () => {
	const { withSound } = useAppSelector(state => state.sound);
	const dispatch = useAppDispatch();

	console.log({ withSound });
	return (
		<div
			className={classNames(style.sound_toggle, { [style.off_sound]: !withSound })}
			onClick={() => dispatch(toggleSound(!withSound))}
		>
			<AiFillSound size={25} />
		</div>
	);
};
export default SoundToggle;

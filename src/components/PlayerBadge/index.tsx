import { Player } from '@/types/Player';
import PlayerAvatar from '../PlayerAvatar';
import style from './index.module.scss';

const PlayerBadge = ({ ...props }: Player) => {
	return (
		<div className={style.player_badge}>
			<PlayerAvatar xy={70} {...props} />
			<div className={style.player_info}>
				<p>{props.fullName}</p>
				<small>{props.position}</small>
			</div>
		</div>
	);
};
export default PlayerBadge;

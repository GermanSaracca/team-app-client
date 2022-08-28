import { Player } from '@/types/Player';
import PlayerAvatar from '../PlayerAvatar';
import style from './index.module.scss';

const PlayerBadge = ({ ...props }: Player) => {
	return (
		<div className={style.player_badge}>
			<PlayerAvatar url={props.avatar} xy={70} title={props.fullName} {...props} />
			<div className={style.player_info}>
				<p>{props.fullName}</p>
				<small>{props.position}</small>
			</div>
		</div>
	);
};
export default PlayerBadge;

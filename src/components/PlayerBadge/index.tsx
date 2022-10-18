import { IPlayer } from '@/types/Player';
import PlayerAvatar from '../PlayerAvatar';
import style from './index.module.scss';

interface Props extends IPlayer {
	avatarDraggable?: boolean;
}

const PlayerBadge = ({ avatarDraggable = true, ...props }: Props) => {
	return (
		<div className={style.player_badge}>
			<div className={style.avatar}>
				<PlayerAvatar xy={50} draggable={avatarDraggable} {...props} />
			</div>
			<div className={style.info}>
				<p>{props.fullName}</p>
				<small>{props.position}</small>
			</div>
		</div>
	);
};
export default PlayerBadge;

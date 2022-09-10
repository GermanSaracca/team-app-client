import { Player } from '@/types/Player';
import PlayerAvatar from '../PlayerAvatar';
import style from './index.module.scss';

interface Props extends Player {
	avatarDraggable?: boolean;
}

const PlayerBadge = ({ avatarDraggable = true, ...props }: Props) => {
	return (
		<div className={style.player_badge}>
			<PlayerAvatar xy={50} draggable={avatarDraggable} {...props} />
			<div className={style.player_info}>
				<p>{props.fullName}</p>
				<small>{props.position}</small>
			</div>
		</div>
	);
};
export default PlayerBadge;

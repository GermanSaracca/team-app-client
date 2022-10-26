import { IPlayer } from '@/types/Player';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import PlayerAvatar from '../PlayerAvatar';
import style from './index.module.scss';

interface Actions {
	edit?: () => void;
	delete?: () => void;
}

interface PlayerActionsProps {
	actions: Actions;
}

interface Props extends IPlayer {
	avatarDraggable?: boolean;
	actions?: Actions;
}

const PlayerBadge = ({ avatarDraggable = true, actions, ...props }: Props) => {
	return (
		<div className={style.player_badge}>
			<div className={style.avatar}>
				<PlayerAvatar xy={50} draggable={avatarDraggable} {...props} />
			</div>
			<div className={style.info}>
				<p>{props.fullName}</p>
				<small>{props.position}</small>
			</div>
			{actions && <PlayerActions actions={actions} />}
		</div>
	);
};

const PlayerActions = ({ actions }: PlayerActionsProps) => {
	return (
		<div className={style.actions_container}>
			{actions.edit && (
				<button onClick={actions.edit} type='button'>
					<MdModeEdit size={20} />
				</button>
			)}
			{actions.delete && (
				<button onClick={actions.delete} type='button'>
					<MdDelete size={20} />
				</button>
			)}
		</div>
	);
};

export default PlayerBadge;

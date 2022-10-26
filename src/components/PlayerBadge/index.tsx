import { IPlayer } from '@/types/Player';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import PlayerAvatar from '../PlayerAvatar';
import style from './index.module.scss';
import colors from '../../styles/_colors.module.scss';
import SwalCustom from '../CustomSwal';

interface Actions {
	edit?: boolean;
	delete?: boolean;
}
interface PlayerActionsProps extends IPlayer {
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
			{actions && <PlayerActions actions={actions} {...props} />}
		</div>
	);
};

const PlayerActions = ({ actions, ...rest }: PlayerActionsProps) => {
	const handleDeletePlayer = () => {
		SwalCustom.fire({
			title: `Seguro que desea eliminar a ${rest.fullName}?`,
			icon: 'warning',
		}).then(result => console.log(result));
	};

	const handleEditPlayer = () => {
		SwalCustom.fire({
			title: `Eitando a ${rest.fullName}`,
		}).then(result => console.log(result));
	};

	return (
		<div className={style.actions_container}>
			{actions.edit && (
				<button onClick={handleEditPlayer} type='button'>
					<MdModeEdit size={20} />
				</button>
			)}
			{actions.delete && (
				<button onClick={handleDeletePlayer} type='button'>
					<MdDelete size={20} />
				</button>
			)}
		</div>
	);
};

export default PlayerBadge;

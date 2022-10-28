import React from 'react';
import { IPlayer } from '@/types/Player';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setIsDraggingPlayer, setIsDraggingPlayerFromField } from '@/store/slices/formation';
import { firstNameToLetter } from '@/utils';
import noAvatarImage from '@/assets/images/no_avatar_image.jpg';
import classNames from 'classnames';
import style from './index.module.scss';
// import usePreventDefaultDragOver from '@/hooks/usePreventDefaultDragOver';

interface Props extends IPlayer {
	xy: number | string;
	draggable?: boolean;
}

const PlayerAvatar = ({
	avatar,
	id,
	fullName,
	position,
	fieldPosition,
	xy,
	draggable = true,
}: Props) => {
	// usePreventDefaultDragOver(); // TODO :aca o global ? Quita el cursor de prohibido

	const dispatch = useAppDispatch();
	const { playersInField } = useAppSelector(state => state.formation);

	const styles = {
		height: xy,
		width: xy,
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		if (draggable) {
			dispatch(setIsDraggingPlayer(true));

			// We search if current player being dragged is already in the field
			const isPlayerInField = playersInField.find(player => player.id === id);

			const playerData: IPlayer = {
				fullName,
				position,
				avatar,
				id,
				fieldPosition,
			};

			if (isPlayerInField) {
				// Si ya esta en campo cuando se empieza a draguear, entonces o estamos moviendo el jugador hacia afuera de la cancha o lo estamos moviendo a otra posicion dentro de la cancha
				e.dataTransfer.setData('player-from-field', JSON.stringify(playerData));
				dispatch(setIsDraggingPlayerFromField(true));
			} else {
				e.dataTransfer.setData('player-from-list', JSON.stringify(playerData));
				dispatch(setIsDraggingPlayerFromField(false));
			}
		}
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		if (draggable) {
			dispatch(setIsDraggingPlayer(false));
			dispatch(setIsDraggingPlayerFromField(false));
		}
	};

	return (
		<>
			<div
				className={classNames(style.player_avatar, {
					[style.draggable]: draggable,
				})}
				style={{
					...styles,
					backgroundImage: avatar ? `url(${avatar?.url})` : `url(${noAvatarImage})`,
				}}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				draggable={draggable ? 'true' : 'false'}
			/>
			{draggable && playersInField.find(player => player.id === id) && (
				<div className={style.current_player_name}>
					<p>{firstNameToLetter(fullName)}</p>
				</div>
			)}
		</>
	);
};
export default PlayerAvatar;

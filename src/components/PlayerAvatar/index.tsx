import React from 'react';
import { Player } from '@/types/Player';
import style from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setIsDraggingPlayer } from '@/store/slices/formation';
import classNames from 'classnames';
// import usePreventDefaultDragOver from '@/hooks/usePreventDefaultDragOver';

interface Props extends Player {
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

			const playerData: Player = {
				fullName,
				position,
				avatar,
				id,
				fieldPosition,
			};

			if (isPlayerInField) {
				// Si ya esta en campo cuando se empieza a draguear, entonces o estamos moviendo el jugador hacia afuera de la cancha o lo estamos moviendo a otra posicion dentro de la cancha
				e.dataTransfer.setData('player-from-field', JSON.stringify(playerData));
			} else {
				e.dataTransfer.setData('player-from-list', JSON.stringify(playerData));
			}
		}
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		if (draggable) {
			dispatch(setIsDraggingPlayer(false));
		}
	};

	return (
		<div
			className={classNames(style.player_avatar, {
				[style.draggable]: draggable,
			})}
			style={styles}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			draggable={draggable ? 'true' : 'false'}
		>
			<img src={avatar} alt={fullName || ''} />
		</div>
	);
};
export default PlayerAvatar;

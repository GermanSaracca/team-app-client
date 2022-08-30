import React from 'react';
import { Player } from '@/types/Player';
import style from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setIsDraggingPlayer } from '@/store/slices/formation';
// import usePreventDefaultDragOver from '@/hooks/usePreventDefaultDragOver';

interface Props extends Player {
	xy: number | string;
}

const PlayerAvatar = ({ avatar, xy, id, fullName, position }: Props) => {
	// usePreventDefaultDragOver(); // TODO :aca o global ? Quita el cursor de prohibido

	const dispatch = useAppDispatch();
	const { playersInField } = useAppSelector(state => state.formation);

	const styles = {
		height: xy,
		width: xy,
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		dispatch(setIsDraggingPlayer(true));

		// We search if current player being dragged is already in the field
		const isPlayerInField = playersInField.find(player => player.id === id);

		const playerData: Player = {
			fullName,
			position,
			avatar,
			id,
		};

		if (isPlayerInField) {
			// Si ya esta en campo cuando se empieza a draguear, entonces o estamos moviendo el jugador hacia afuera de la cancha o lo estamos moviendo a otra posicion dentro de la cancha
			e.dataTransfer.setData('player-from-field', JSON.stringify(playerData));
		} else {
			e.dataTransfer.setData('player-from-list', JSON.stringify(playerData));
		}
	};

	const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
		dispatch(setIsDraggingPlayer(false));
	};

	return (
		<div
			className={style.player_avatar}
			style={styles}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			draggable
		>
			<img src={avatar} alt={fullName || ''} />
		</div>
	);
};
export default PlayerAvatar;

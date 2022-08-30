import React, { useEffect, useState, memo } from 'react';
import {
	addPlayerToField,
	setPlayerToReplaceOnOrigin,
	setPlayerIdToReplace,
} from '@/store/slices/formation';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import PlayerAvatar from '@/components/PlayerAvatar';
import { Player } from '@/types/Player';
import classNames from 'classnames';
import style from './index.module.scss';
import { enableDropping } from '@/utils';
// import usePrevious from '@/hooks/usePrevious';

// interface Props {
// 	columnNumber: number;
// }

const FieldDroppableSpot = () => {
	const dispatch = useAppDispatch();
	const { isDraggingPlayer, playerToReplaceOnOrigin, playerIdToReplace } = useAppSelector(
		state => state.formation
	);
	const [isPlayerOnTop, setIsPlayerOnTop] = useState<boolean>(false);
	const [droppedPlayer, setDroppedPlayer] = useState<Player | null>(null);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer.getData('player-from-list')) {
			console.log('Agregado player');
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-list'));

			// Add player tho the store
			console.log('despachando jugador ');
			dispatch(addPlayerToField(playerTransferredData));
			setDroppedPlayer(playerTransferredData);
			setIsPlayerOnTop(false);
		}
		if (e.dataTransfer.getData('player-from-field')) {
			console.log('receiving player from field');
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-field'));

			// Si el jugador viene desde la cancha y ya tenemos uno
			if (droppedPlayer) {
				if (droppedPlayer.id === playerTransferredData.id) {
					return;
				}
				// Player from here to set on the droppable spot from where new player comes [REPLACEMENT]
				dispatch(setPlayerToReplaceOnOrigin(droppedPlayer));
				dispatch(setPlayerIdToReplace(playerTransferredData.id));
				// Set new player in spot
				setDroppedPlayer(playerTransferredData);
				// No more on top
				setIsPlayerOnTop(false);
			}
		}
	};
	// The dragenter event is fired when a dragged element or text selection enters a valid drop target.
	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		// console.log('%cJUGADOR ENTRANDO', 'background-color: green;');
		setIsPlayerOnTop(true);
	};
	// The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		// console.log('%cJUGADOR YENDOSE', 'background-color: #ff5500;');
		setIsPlayerOnTop(false);
	};

	return (
		<div
			className={classNames(style.field_droppable_spot, {
				[style.is_player_on_top]: isPlayerOnTop,
				[style.is_dragging_player]: isDraggingPlayer && !droppedPlayer,
				[style.has_player_inside]: droppedPlayer,
			})}
			onDrop={handleDrop}
			onDragOver={enableDropping}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
		>
			{droppedPlayer && <PlayerAvatar xy='100%' {...droppedPlayer} />}
		</div>
	);
};
export default memo(FieldDroppableSpot);

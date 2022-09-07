import React, { useState, memo } from 'react';
import {
	addPlayerToField,
	removePlayerFromField,
	replacePlayers,
	setIsDraggingPlayer,
} from '@/store/slices/formation';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import PlayerAvatar from '@/components/PlayerAvatar';
import { FieldPosition, Player } from '@/types/Player';
import { enableDropping } from '@/utils';
// import { BsArrowUp } from 'react-icons/bs';
import {
	ImArrowDown,
	ImArrowDownLeft,
	ImArrowLeft,
	ImArrowUpLeft,
	ImArrowUp,
	ImArrowUpRight,
	ImArrowRight,
	ImArrowDownRight,
} from 'react-icons/im';
import classNames from 'classnames';
import style from './index.module.scss';

// import usePrevious from '@/hooks/usePrevious';

interface Props {
	fieldPosition: FieldPosition;
	currentPlayer: Player | null;
}

const FieldDroppableSpot = ({ fieldPosition, currentPlayer }: Props) => {
	const dispatch = useAppDispatch();
	const { isDraggingPlayer } = useAppSelector(state => state.formation);
	const [isPlayerOnTop, setIsPlayerOnTop] = useState<boolean>(false);
	// const [currentPlayer, setDroppedPlayer] = useState<Player | null>(null);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer.getData('player-from-list')) {
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-list'));

			// Si ya tengo un jugador entonces el que esta va a la lista
			if (currentPlayer) {
				// Add player tho the field
				dispatch(addPlayerToField({ ...playerTransferredData, fieldPosition }));
				dispatch(removePlayerFromField(currentPlayer));
			} else {
				// Add player tho the field
				dispatch(addPlayerToField({ ...playerTransferredData, fieldPosition }));
			}

			setIsPlayerOnTop(false);
		}
		if (e.dataTransfer.getData('player-from-field')) {
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-field'));

			if (!currentPlayer) {
				dispatch(addPlayerToField({ ...playerTransferredData, fieldPosition }));
			} else {
				// Replace one for another in array
				dispatch(replacePlayers([currentPlayer, playerTransferredData]));
			}
			// No more on top
			setIsPlayerOnTop(false);
		}
		dispatch(setIsDraggingPlayer(false));
	};
	// The dragenter event is fired when a dragged element or text selection enters a valid drop target.
	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		setIsPlayerOnTop(true);
	};
	// The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		setIsPlayerOnTop(false);
	};

	return (
		<div
			className={classNames(style.field_droppable_spot, {
				[style.is_player_on_top]: isPlayerOnTop,
				[style.is_dragging_player]: isDraggingPlayer && !currentPlayer,
				[style.has_player_inside]: currentPlayer,
			})}
			onDrop={handleDrop}
			onDragOver={enableDropping}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
		>
			{currentPlayer && <PlayerAvatar {...currentPlayer} fieldPosition={fieldPosition} xy='100%' />}
			<div className={style.arrows_container}>
				<ImArrowDown size={20} className={style.arrow_down} />
				<ImArrowDownLeft size={20} className={style.arrow_down_left} />
				<ImArrowLeft size={20} className={style.arrow_left} />
				<ImArrowUpLeft size={20} className={style.arrow_up_left} />
				<ImArrowUp size={20} className={style.arrow_up} />
				<ImArrowUpRight size={20} className={style.arrow_up_right} />
				<ImArrowRight size={20} className={style.arrow_right} />
				<ImArrowDownRight size={20} className={style.arrow_down_right} />
			</div>
		</div>
	);
};
export default memo(FieldDroppableSpot);

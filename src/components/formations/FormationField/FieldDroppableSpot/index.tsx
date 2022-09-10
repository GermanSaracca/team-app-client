import React, { useState, memo, useEffect } from 'react';
import {
	changePlayerFieldPosition,
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
import useSound from 'use-sound';
import tapSound from '../../../../assets/audio/tap.wav';
import classNames from 'classnames';
import style from './index.module.scss';

// import usePrevious from '@/hooks/usePrevious';

interface Props {
	fieldPosition: FieldPosition;
	currentPlayer: Player | null;
}

interface IArrowsActive {
	arrow_up: boolean;
	arrow_up_right: boolean;
	arrow_right: boolean;
	arrow_down_right: boolean;
	arrow_down: boolean;
	arrow_down_left: boolean;
	arrow_left: boolean;
	arrow_up_left: boolean;
}

const FieldDroppableSpot = ({ fieldPosition, currentPlayer }: Props) => {
	const dispatch = useAppDispatch();
	const { isDraggingPlayer } = useAppSelector(state => state.formation);
	const { withSound } = useAppSelector(state => state.sound);
	const [isPlayerOnTop, setIsPlayerOnTop] = useState<boolean>(false);
	const [arrowsActive, setArrowsActive] = useState<IArrowsActive>({
		arrow_up: false,
		arrow_up_right: false,
		arrow_right: false,
		arrow_down_right: false,
		arrow_down: false,
		arrow_down_left: false,
		arrow_left: false,
		arrow_up_left: false,
	});

	const [play] = useSound(tapSound);

	useEffect(() => {
		// Reset arrows state
		setArrowsActive({
			arrow_up: false,
			arrow_up_right: false,
			arrow_right: false,
			arrow_down_right: false,
			arrow_down: false,
			arrow_down_left: false,
			arrow_left: false,
			arrow_up_left: false,
		});
	}, [currentPlayer, fieldPosition]);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer.getData('player-from-list')) {
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-list'));

			// Si ya tengo un jugador entonces el que esta va a la lista
			if (currentPlayer) {
				dispatch(removePlayerFromField(currentPlayer));
			}
			// Add player tho the field
			dispatch(addPlayerToField({ ...playerTransferredData, fieldPosition }));

			setIsPlayerOnTop(false);
		}
		if (e.dataTransfer.getData('player-from-field')) {
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-field'));

			if (!currentPlayer) {
				/**
				 * If currentPlayer is null means that we are draggin an in field player to one empty spot
				 */
				dispatch(
					changePlayerFieldPosition({
						player: playerTransferredData,
						newFieldPosition: fieldPosition,
					})
				);
			} else {
				// Replace one for another in array
				dispatch(replacePlayers([currentPlayer, playerTransferredData]));
			}
			setIsPlayerOnTop(false);
		}
		dispatch(setIsDraggingPlayer(false));
		withSound && play();
	};
	// The dragenter event is fired when a dragged element or text selection enters a valid drop target.
	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		setIsPlayerOnTop(true);
	};
	// The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		setIsPlayerOnTop(false);
	};

	const handleArrowActive = (arrow: string) => {
		setArrowsActive(s => ({
			...s,
			[arrow]: !s[arrow as keyof IArrowsActive],
		}));
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
			{currentPlayer && (
				<div className={style.arrows_selection_area}>
					<div className={style.arrows_container}>
						<ImArrowDown
							size={20}
							className={classNames(style.arrow_down, {
								[style.isActive]: arrowsActive.arrow_down,
							})}
							onClick={() => handleArrowActive('arrow_down')}
						/>
						<ImArrowDownLeft
							size={20}
							className={classNames(style.arrow_down_left, {
								[style.isActive]: arrowsActive.arrow_down_left,
							})}
							onClick={() => handleArrowActive('arrow_down_left')}
						/>
						<ImArrowLeft
							size={20}
							className={classNames(style.arrow_left, {
								[style.isActive]: arrowsActive.arrow_left,
							})}
							onClick={() => handleArrowActive('arrow_left')}
						/>
						<ImArrowUpLeft
							size={20}
							className={classNames(style.arrow_up_left, {
								[style.isActive]: arrowsActive.arrow_up_left,
							})}
							onClick={() => handleArrowActive('arrow_up_left')}
						/>
						<ImArrowUp
							size={20}
							className={classNames(style.arrow_up, {
								[style.isActive]: arrowsActive.arrow_up,
							})}
							onClick={() => handleArrowActive('arrow_up')}
						/>
						<ImArrowUpRight
							size={20}
							className={classNames(style.arrow_up_right, {
								[style.isActive]: arrowsActive.arrow_up_right,
							})}
							onClick={() => handleArrowActive('arrow_up_right')}
						/>
						<ImArrowRight
							size={20}
							className={classNames(style.arrow_right, {
								[style.isActive]: arrowsActive.arrow_right,
							})}
							onClick={() => handleArrowActive('arrow_right')}
						/>
						<ImArrowDownRight
							size={20}
							className={classNames(style.arrow_down_right, {
								[style.isActive]: arrowsActive.arrow_down_right,
							})}
							onClick={() => handleArrowActive('arrow_down_right')}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
export default memo(FieldDroppableSpot);

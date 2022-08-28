import { useAppSelector } from '@/hooks/reduxHooks';
import classNames from 'classnames';
import React, { useState } from 'react';
import style from './index.module.scss';

const FieldDroppableSpot = () => {
	const { isDraggingPlayer } = useAppSelector(state => state.formation);
	const [isPlayerOnTop, setIsPlayerOnTop] = useState<boolean>(false);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-info'));
		console.log(playerTransferredData);
	};
	// The dragenter event is fired when a dragged element or text selection enters a valid drop target.
	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		console.log('Algo entro al spot');
		setIsPlayerOnTop(true);
	};
	// The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		console.log('Algo salio del spot');
		setIsPlayerOnTop(false);
	};
	const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	return (
		<div
			className={classNames(style.field_droppable_spot, {
				[style.is_player_on_top]: isPlayerOnTop,
				[style.is_dragging_player]: isDraggingPlayer,
			})}
			onDrop={handleDrop}
			onDragOver={enableDropping}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
		></div>
	);
};
export default FieldDroppableSpot;

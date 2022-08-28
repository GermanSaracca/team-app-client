import React from 'react';
import { Player } from '@/types/Player';
import style from './index.module.scss';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setIsDraggingPlayer } from '@/store/slices/formation';
// import usePreventDefaultDragOver from '@/hooks/usePreventDefaultDragOver';

interface Props extends Player {
	url: string;
	title?: string;
	xy: number;
}

const PlayerAvatar = ({ url, title, xy, id, fullName, position }: Props) => {
	// usePreventDefaultDragOver(); // TODO :aca o global ?

	const dispatch = useAppDispatch();

	const styles = {
		height: xy,
		width: xy,
	};

	const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		console.log('a');
		dispatch(setIsDraggingPlayer(true));

		e.dataTransfer.setData(
			'player-info',
			JSON.stringify({
				fullName,
				url,
				position,
				id,
			})
		);
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
			<img src={url} alt={title || ''} />
		</div>
	);
};
export default PlayerAvatar;

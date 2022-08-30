import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import PlayerBadge from '../PlayerBadge';
import style from './index.module.scss';
import { removePlayerFromField } from '@/store/slices/formation';
import { enableDropping } from '@/utils';

const PlayersList = () => {
	const { playersInList } = useAppSelector(state => state.formation);
	const dispatch = useAppDispatch();

	// When
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer.getData('player-from-field')) {
			console.log('receiving player from field');
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-field'));

			dispatch(removePlayerFromField(playerTransferredData));
		}
	};

	return (
		<div className={style.players_list_container} onDrop={handleDrop} onDragOver={enableDropping}>
			{/* TODO: Quitar cantidad o poner de dfte manera */}
			<p>Cantidad de jugadores: {playersInList.length}</p>
			<ul className={style.players_list}>
				{playersInList.map(({ fullName, position, avatar, id }) => {
					return (
						<li key={id}>
							<PlayerBadge fullName={fullName} position={position} avatar={avatar} id={id} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default PlayersList;

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import PlayerBadge from '../../PlayerBadge';
import style from './index.module.scss';
import { removePlayerFromField, resetFormation } from '@/store/slices/formation';
import { enableDropping } from '@/utils';
import { GrPowerReset } from 'react-icons/gr';
import useSound from 'use-sound';
import pinbalSound from '../../../assets/audio/pinbal.wav';

const PlayersList = () => {
	const { playersInList } = useAppSelector(state => state.formation);
	const { withSound } = useAppSelector(state => state.sound);
	const dispatch = useAppDispatch();
	const [play] = useSound(pinbalSound);

	// When
	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (e.dataTransfer.getData('player-from-field')) {
			const playerTransferredData = JSON.parse(e.dataTransfer.getData('player-from-field'));

			dispatch(removePlayerFromField(playerTransferredData));
			withSound && play();
		}
	};

	return (
		<div className={style.players_list_container} onDrop={handleDrop} onDragOver={enableDropping}>
			<div className={style.total_players_in_list}>
				<small>Jugadores disponibles: {playersInList.length}</small>
				<button onClick={() => dispatch(resetFormation())} title='Reset formation'>
					<GrPowerReset />
				</button>
			</div>
			<ul className={style.players_list}>
				{playersInList.map(({ fullName, position, avatar, id }) => {
					return (
						<li key={id}>
							<PlayerBadge fullName={fullName} position={position} avatar={avatar} id={id} />
						</li>
					);
				})}
			</ul>
			<div className={style.bottom_gradient} />
		</div>
	);
};
export default PlayersList;

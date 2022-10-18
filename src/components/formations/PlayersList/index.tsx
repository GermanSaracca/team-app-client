import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import PlayerBadge from '../../PlayerBadge';
import style from './index.module.scss';
import { removePlayerFromField, resetFormation } from '@/store/slices/formation';
import { enableDropping } from '@/utils';
import { GrPowerReset } from 'react-icons/gr';
import { MdEventSeat } from 'react-icons/md';
import useSound from 'use-sound';
import pinbalSound from '../../../assets/audio/pinbal.wav';
import classNames from 'classnames';

const PlayersList = () => {
	const { playersInList, isDraggingPlayer, isDraggingPlayerFromField } = useAppSelector(
		state => state.formation
	);
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
		<div
			className={classNames(style.players_list_container, {
				[style.drop_mode]: isDraggingPlayer && isDraggingPlayerFromField,
			})}
			onDrop={handleDrop}
			onDragOver={enableDropping}
		>
			<div className={style.total_players_in_list}>
				<small>Jugadores disponibles: {playersInList.length}</small>
				<button onClick={() => dispatch(resetFormation())}>
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
			{/* Drop zone Hint */}
			<div
				className={classNames(style.drop_hint_zone, {
					[style.show]: isDraggingPlayer && isDraggingPlayerFromField,
				})}
			>
				<MdEventSeat size={100} className={style.hint_icon} />
			</div>

			<div className={style.bottom_gradient} />
		</div>
	);
};
export default PlayersList;

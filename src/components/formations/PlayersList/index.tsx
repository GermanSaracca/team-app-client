import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useSound from 'use-sound';
import { removePlayerFromField, resetFormation } from '@/store/slices/formation';
import PlayerBadge from '../../PlayerBadge';
import { enableDropping } from '@/utils';
import { GrPowerReset } from 'react-icons/gr';
import { MdEventSeat } from 'react-icons/md';
import pinbalSound from '../../../assets/audio/pinbal.wav';
import classNames from 'classnames';
import style from './index.module.scss';

const PlayersList = () => {
	const { playersInList, isDraggingPlayer, isDraggingPlayerFromField } = useAppSelector(
		state => state.formation
	);
	const { withSound } = useAppSelector(state => state.sound);
	const dispatch = useAppDispatch();
	const [play] = useSound(pinbalSound);
	const playersListRef = useRef<HTMLDivElement>(null);

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
			ref={playersListRef}
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
							<PlayerBadge
								fullName={fullName}
								position={position}
								avatar={avatar}
								avatarSize={60}
								id={id}
							/>
						</li>
					);
				})}
			</ul>
			{/* Drop zone Hint */}
			<div
				className={classNames(style.drop_hint_zone, {
					[style.show]: isDraggingPlayer && isDraggingPlayerFromField,
				})}
				style={{
					top: `${playersListRef?.current?.scrollTop}px`,
				}}
			>
				<MdEventSeat size={100} />
			</div>
			<div className={style.bottom_gradient} />
		</div>
	);
};
export default PlayersList;

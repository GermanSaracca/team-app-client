import { useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import PlayerBadge from '@/components/PlayerBadge';
import PlayerForm from '@/components/players/PlayerForm';
import SwalCustom from '@/components/CustomSwal';
import style from './index.module.scss';
import { IPlayer } from '@/types';
import CustomModal from '@/components/CustomModal';

const Players = () => {
	const { players } = useAppSelector(state => state.players);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [playerToEdit, setPlayerToEdit] = useState<IPlayer | null>(null);

	// TODO: Agregar jugador (Firebase)
	// TODO: Eliminar jugador (Firebase)
	// TODO: Editar jugador (Firebase)
	// TODO: Eliminar object urls guardados en memoria luego de su uso

	// DELETE PLAYER
	const onDeletePlayer = (player: IPlayer) => {
		SwalCustom.fire({
			title: `Seguro que desea eliminar a ${player.fullName}?`,
			icon: 'warning',
		}).then(result => console.log(result));
	};

	// EDIT PLAYER
	const onEditPlayer = (player: IPlayer) => {
		setIsModalOpen(true);
		setPlayerToEdit(player);
	};

	return (
		<div className={style.players_layout}>
			{/* Add Player Form */}
			<div className={style.form_container}>
				<h3>Agrega un nuevo jugador 👇</h3>
				<PlayerForm mode='create' />
			</div>
			{/* End Add Player Form */}

			{/* Players Grid */}
			<div className={style.players_grid}>
				{players.map(player => (
					<PlayerBadge
						fullName={player.fullName}
						position={player.position}
						avatar={player.avatar}
						id={player.id}
						key={player.id}
						avatarDraggable={false}
						actions={{
							delete: () => onDeletePlayer(player),
							edit: () => {
								onEditPlayer(player);
							},
						}}
					/>
				))}
			</div>
			{/* End Players Grid */}
			<CustomModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				headerTitle='Editar Jugador'
			>
				{playerToEdit && (
					<PlayerForm
						mode='edit'
						fullName={playerToEdit.fullName}
						position={playerToEdit.position}
						avatar={playerToEdit.avatar}
					/>
				)}
			</CustomModal>
		</div>
	);
};
export default Players;

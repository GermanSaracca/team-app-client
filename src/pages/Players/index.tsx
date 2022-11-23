import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { deletePlayer } from '@/libs/firebase';
import PlayerBadge from '@/components/PlayerBadge';
import PlayerForm from '@/components/players/PlayerForm';
import SwalCustom from '@/components/CustomSwal';
import CustomModal from '@/components/CustomModal';
import { IPlayer } from '@/types';
import style from './index.module.scss';
import { getAllPlayers } from '@/store/slices/players';
import { SpinnerEllipsis } from '@/components/Spinners';

const Players = () => {
	const { players, loadingGetAllPlayers, errorGetAllPlayers } = useAppSelector(
		state => state.players
	);
	const dispatch = useAppDispatch();
	const [playerToEdit, setPlayerToEdit] = useState<IPlayer | null>(null);

	useEffect(() => {
		dispatch(getAllPlayers());
	}, [dispatch]);

	// TODO: Eliminar object urls guardados en memoria luego de su uso

	// DELETE PLAYER
	const onDeletePlayer = (player: IPlayer) => {
		SwalCustom.fire({
			title: `Seguro que desea eliminar a ${player.fullName}?`,
			icon: 'warning',
			showLoaderOnConfirm: true,
			allowOutsideClick: () => !SwalCustom.isLoading(),
			preConfirm: async () => {
				try {
					await deletePlayer(player.id, player.avatar);
				} catch (e) {
					console.error(e);

					SwalCustom.showValidationMessage('Ha ocurrido un error. Intente nuevamente');
				}
			},
		}).then(result => {
			if (result.isConfirmed) {
				SwalCustom.fire({
					title: `Jugador ${player.fullName} eliminado.`,
					showDenyButton: false,
					showConfirmButton: false,
					icon: 'success',
					showCloseButton: true,
				});
			}
		});
	};

	// EDIT PLAYER
	const onEditPlayer = (player: IPlayer) => {
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
				{loadingGetAllPlayers && <SpinnerEllipsis color='primary' />}
				{!loadingGetAllPlayers &&
					players.length > 0 &&
					players.map(player => (
						<PlayerBadge
							fullName={player.fullName}
							position={player.position}
							avatar={player.avatar}
							avatarSize={75}
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
				isOpen={Boolean(playerToEdit)}
				onRequestClose={() => setPlayerToEdit(null)}
				headerTitle='Editar Jugador'
			>
				<PlayerForm
					mode='edit'
					fullName={playerToEdit?.fullName}
					position={playerToEdit?.position}
					avatar={playerToEdit?.avatar}
					id={playerToEdit?.id}
					onSuccesfullOperation={() => setPlayerToEdit(null)}
				/>
			</CustomModal>
		</div>
	);
};
export default Players;

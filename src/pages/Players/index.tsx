import CustomSelect from '@/components/CustomSelect';
import PlayerBadge from '@/components/PlayerBadge';
import { POSITION_OPTIONS } from '@/data';
import { useAppSelector } from '@/hooks/reduxHooks';
import { FiSave } from 'react-icons/fi';
import style from './index.module.scss';
import ImageUploading from '@/components/players/ImageUploading';

const Players = () => {
	const { players } = useAppSelector(state => state.players);

	return (
		<div className={style.players_layout}>
			{/* Add Player Form */}
			<div className={style.form_container}>
				<h3>Agrega un nuevo jugador 👇</h3>
				<form>
					{/* Name */}
					<div className={style.form_group}>
						<label htmlFor='name'>Nombre completo</label>
						<input
							className={style.name_input}
							type='text'
							id='name'
							placeholder='Ej: Lionel Messi'
							autoComplete='off'
						/>
					</div>
					{/* Position */}
					<div className={style.form_group}>
						<label htmlFor='position'>Posición</label>
						<CustomSelect options={POSITION_OPTIONS} />
					</div>

					{/* Image */}

					<div className={style.form_group}>
						<label>Imagen</label>
						<ImageUploading />
					</div>

					<button className={style.save_player_btn} type='submit'>
						<FiSave size={20} />
						Agregar jugador
					</button>
				</form>
			</div>
			{/* End Add Player Form */}

			{/* Players Grid */}
			<div className={style.players_grid}>
				{players.map(p => (
					<PlayerBadge
						fullName={p.fullName}
						position={p.position}
						avatar={p.avatar}
						id={p.id}
						key={p.id}
						avatarDraggable={false}
					/>
				))}
			</div>
			{/* End Players Grid */}
		</div>
	);
};
export default Players;

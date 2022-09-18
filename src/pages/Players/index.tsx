import CustomDropFileZone from '@/components/CustomDropFileZone';
import CustomSelect from '@/components/CustomSelect';
import PlayerBadge from '@/components/PlayerBadge';
import { POSITION_OPTIONS } from '@/data';
import { useAppSelector } from '@/hooks/reduxHooks';
import style from './index.module.scss';

const Players = () => {
	const { players } = useAppSelector(state => state.players);
	return (
		<div className={style.players_layout}>
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
					<CustomDropFileZone />
				</form>
			</div>
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
		</div>
	);
};
export default Players;

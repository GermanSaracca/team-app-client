import PlayersList from '@/components/formations/PlayersList';
import FormationField from '@/components/formations/FormationField';
import style from './index.module.scss';
import FormationSelect from '@/components/formations/FormationSelect';
import TeamSizeSelector from '@/components/formations/TeamSizeSelector';

const Formations = () => {
	return (
		<div className={style.formations_layout}>
			<header className={style.formation_header}>
				<div className={style.usage_info}>
					<p className='mb-1'>Arrastra los jugadores hacia la posicion que quieras.</p>
					<p>Pon el cursor encima del avatar del jugador para comenzar a arrastrarlo.</p>
				</div>
				<div className={style.options}>
					<TeamSizeSelector />
					<FormationSelect minWidth={110} />
				</div>
			</header>
			{/* PLAYERS LIST */}
			<PlayersList />
			{/* FORMATION FIELD */}
			<div className={style.formation_container}>
				<FormationField />
			</div>
		</div>
	);
};
export default Formations;

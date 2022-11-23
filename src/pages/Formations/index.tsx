import PlayersList from '@/components/formations/PlayersList';
import FormationField from '@/components/formations/FormationField';
import style from './index.module.scss';
import FormationSelect from '@/components/formations/FormationSelect';
import TeamSizeSelect from '@/components/formations/TeamSizeSelect';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks';
import { resetFormation } from '@/store/slices/formation';

const Formations = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			// TODO : Dar aviso que se perderan los cambios de salir, hacer con router on popup ?
			dispatch(resetFormation());
		};
	}, [dispatch]);

	return (
		<div className={style.formations_layout}>
			<header className={style.formation_header}>
				<div className={style.usage_info}>
					<p className='mb-1'>Arrastra los jugadores hacia la posicion que quieras.</p>
					<p>Pon el cursor encima del avatar del jugador para comenzar a arrastrarlo.</p>
				</div>
				<div className={style.options}>
					<TeamSizeSelect />
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

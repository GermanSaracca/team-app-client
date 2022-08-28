import { useState } from 'react';
import CustomSelect from '@/components/CustomSelect';
import FormationField from '@/components/FormationField';
import PlayerBadge from '@/components/PlayerBadge';
import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { PLAYERS } from '@/data/players';
import { OptionType } from '@/types/OptionType';
import style from './index.module.scss';

const Formations = () => {
	// Set the field formation eg: 4-4-2 or 4-5-1
	const [formation, setFormation] = useState<OptionType>(FORMATION_OPTIONS[0]);

	const handleChange = (selected: OptionType | unknown) => {
		setFormation(selected as OptionType);
	};

	return (
		<div className={style.formations_layout}>
			<header className={style.formation_header}>
				<div className={style.usage_info}>
					<p className='mb-1'>Arrastra los jugadores hacia la posicion que quieras.</p>
					<p>Pon el cursor encima del avatar del jugador para comenzar a arrastrarlo.</p>
				</div>
				<div className={style.options}>
					<p>Elegi una formación 👉</p>
					<CustomSelect
						placeholder='Formaciones'
						options={FORMATION_OPTIONS}
						defaultValue={formation}
						hideSelectedOptions
						onChange={handleChange}
					/>
				</div>
			</header>
			{/* PLAYERS LIST */}
			<div className={style.players_list_container}>
				<ul className={style.players_list}>
					{PLAYERS.map(({ fullName, position, avatar, id }) => {
						return (
							<li key={id}>
								<PlayerBadge fullName={fullName} position={position} avatar={avatar} id={id} />
							</li>
						);
					})}
				</ul>
			</div>
			{/* FORMATION FIELD */}
			<div className={style.formation_container}>
				<FormationField formation={formation.value} />
			</div>
		</div>
	);
};
export default Formations;

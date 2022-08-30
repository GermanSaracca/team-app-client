import { useEffect, useState } from 'react';
import style from './index.module.scss';
import FieldColumn from './FieldColumn';
import { useAppSelector } from '@/hooks/reduxHooks';
import FieldDroppableSpot from './FieldDroppableSpot';
import classNames from 'classnames';

const FormationField = () => {
	const { formation } = useAppSelector(state => state.formation);
	const [columnsToMap, setColumnsToMap] = useState<number[]>([]);

	useEffect(() => {
		const formationColumns = formation.value.split('-').map(e => Number(e)); // '4-3-3' => ['4','3','3']

		setColumnsToMap(formationColumns);
	}, [formation.value]);

	return (
		<div className={style.formation_field}>
			{/* Only visual, field lines */}
			<div className={style.field_lines}>
				<div className={style.area_grande_1}>
					<div className={style.area_chica}></div>
					<div className={style.arco}></div>
				</div>
				<div className={style.area_grande_2}>
					<div className={style.area_chica}></div>
					<div className={style.arco}></div>
				</div>
				<div className={style.linea_mitad_cancha}></div>
				<div className={style.circulo_mitad_cancha}></div>
			</div>
			<div className={style.positions_container}>
				{/* Arquero fijo */}
				<div className={classNames(style.player_position, { [style.goalkeeper]: true })}>
					<FieldDroppableSpot />
				</div>
				{/* JUGADORES */}

				{/* <FieldColumn positionsNumber={1} columnNumber={0} />
				{columnsToMap.map((col, i) => (
					<FieldColumn positionsNumber={col} columnNumber={i + 1} key={formation.value + i} />
				))} */}
			</div>
		</div>
	);
};
export default FormationField;

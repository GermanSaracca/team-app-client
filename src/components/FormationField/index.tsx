import { useEffect, useState } from 'react';
import style from './index.module.scss';
import FieldColumn from './FieldColumn';

interface Props {
	formation: string;
}

const FormationField = ({ formation }: Props) => {
	const [columnsToMap, setColumnsToMap] = useState<number[]>([]);

	useEffect(() => {
		const formationColumns = formation.split('-').map(e => Number(e)); // '4-3-3' => ['4','3','3']

		setColumnsToMap(formationColumns);
	}, [formation]);

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
				<FieldColumn positionsNumber={1} />
				{columnsToMap.map((col, i) => (
					<FieldColumn positionsNumber={col} key={i} />
				))}
			</div>
		</div>
	);
};
export default FormationField;

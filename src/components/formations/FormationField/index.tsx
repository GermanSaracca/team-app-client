import { useEffect, useState } from 'react';
import FieldDroppableSpot from './FieldDroppableSpot';
import { enableDropping } from '@/utils';
import { useAppSelector } from '@/hooks/reduxHooks';
import classNames from 'classnames';
import { IPlayer } from '@/types';
import style from './index.module.scss';

interface DroppablePosition {
	dataPlayer: IPlayer | null;
	fieldPosition: IPlayer['fieldPosition'];
}

const FormationField = () => {
	const { formation, teamSize, playersInField } = useAppSelector(state => state.formation);

	const [droppables, setDroppables] = useState<DroppablePosition[]>([]);

	useEffect(() => {
		const newArray: DroppablePosition[] = Array(teamSize)
			.fill({})
			.map((e, i) => {
				return {
					dataPlayer: null,
					fieldPosition: (i + 1).toString() as IPlayer['fieldPosition'],
				};
			});

		if (playersInField.length > 0) {
			playersInField.forEach((player, i) => {
				const newArrayIndex = newArray.findIndex(e => e.fieldPosition === player.fieldPosition);
				if (newArrayIndex !== -1) {
					newArray[newArrayIndex].dataPlayer = player;
				}
			});
			setDroppables(newArray);
		} else {
			setDroppables(newArray);
		}
	}, [teamSize, playersInField]);

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
			<div
				className={classNames(style.positions_container, {
					[style.positions_5]: teamSize === 5,
					[style.positions_6]: teamSize === 6,
					[style.positions_7]: teamSize === 7,
					[style.positions_8]: teamSize === 8,
					[style.positions_9]: teamSize === 9,
					[style.positions_10]: teamSize === 10,
					[style.positions_11]: teamSize === 11,
					[style[`formation_${formation}`]]: true,
				})}
				onDragOver={enableDropping}
			>
				{droppables.length &&
					droppables.map(p => {
						const playerClass = `player__${p.fieldPosition}`;

						return (
							<div
								className={classNames({
									[style.player]: true,
									[style[playerClass]]: true,
								})}
								key={p.fieldPosition}
							>
								<FieldDroppableSpot fieldPosition={p.fieldPosition} currentPlayer={p.dataPlayer} />
							</div>
						);
					})}
			</div>
		</div>
	);
};
export default FormationField;

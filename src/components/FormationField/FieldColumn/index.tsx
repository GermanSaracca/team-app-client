import FieldDroppableSpot from '../FieldDroppableSpot';
import style from './index.module.scss';

interface Props {
	positionsNumber: number;
	columnNumber: number;
}

const FieldColumn = ({ positionsNumber, columnNumber }: Props) => {
	return (
		<div className={style.field_column}>
			{Array(positionsNumber)
				.fill('')
				.map((e, i) => (
					<FieldDroppableSpot key={i} />
				))}
		</div>
	);
};
export default FieldColumn;

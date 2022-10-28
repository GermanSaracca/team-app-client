import colors from '../../styles/_colors.module.scss';
import './index.scss';

interface Props {
	color: 'primary' | 'white' | 'black' | 'error';
}

export const SpinnerEllipsis = ({ color }: Props) => {
	const { Primary, White, Black, Error } = colors;

	const backgroundColor = () => {
		switch (color) {
			case 'primary':
				return { backgroundColor: Primary };
			case 'white':
				return { backgroundColor: White };
			case 'black':
				return { backgroundColor: Black };
			case 'error':
				return { backgroundColor: Error };
			default:
				return { backgroundColor: Primary };
		}
	};

	return (
		<div className='lds-ellipsis'>
			<div style={backgroundColor()}></div>
			<div style={backgroundColor()}></div>
			<div style={backgroundColor()}></div>
			<div style={backgroundColor()}></div>
		</div>
	);
};

import Select, { Props } from 'react-select';
import './index.scss';

const CustomSelect = (props: Props) => {
	return <Select {...props} className='custom-select' classNamePrefix='custom-select' />;
};
export default CustomSelect;

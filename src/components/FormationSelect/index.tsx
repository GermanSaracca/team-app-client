import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setFormation } from '@/store/slices/formation';
import { OptionType } from '@/types/OptionType';
import CustomSelect from '../CustomSelect';

const FormationSelect = () => {
	const dispatch = useAppDispatch();

	// Add formation selected to the store
	const handleChange = (selected: OptionType | unknown) => {
		dispatch(setFormation(selected as OptionType));
	};

	return (
		<CustomSelect
			placeholder='Formaciones'
			options={FORMATION_OPTIONS}
			defaultValue={FORMATION_OPTIONS[0]}
			hideSelectedOptions
			onChange={handleChange}
		/>
	);
};
export default FormationSelect;

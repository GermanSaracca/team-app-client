import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setFormation } from '@/store/slices/formation';
import { FormationOptionType } from '@/types/FormationOptionType';
import CustomSelect from '../../CustomSelect';

const FormationSelect = () => {
	const dispatch = useAppDispatch();

	// Add formation selected to the store
	const handleChange = (selected: FormationOptionType | unknown) => {
		dispatch(setFormation(selected as FormationOptionType));
	};

	return (
		<div>
			<p className='mb-1 text-sm'>Formación 👇</p>
			<CustomSelect
				placeholder='Formaciones'
				options={FORMATION_OPTIONS}
				defaultValue={FORMATION_OPTIONS[0]}
				hideSelectedOptions
				onChange={handleChange}
			/>
		</div>
	);
};
export default FormationSelect;

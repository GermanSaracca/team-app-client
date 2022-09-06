import { useState, useEffect } from 'react';
import { FORMATION_OPTIONS } from '@/data/formationOptions';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFormation } from '@/store/slices/formation';
import { FormationOptionType } from '@/types/FormationOptionType';
import CustomSelect from '../../CustomSelect';

const FormationSelect = ({ minWidth = 'unset' }: { minWidth?: number | string }) => {
	const dispatch = useAppDispatch();
	const { formation, teamSize } = useAppSelector(state => state.formation);
	const [value, setValue] = useState(FORMATION_OPTIONS.find(option => option.value === formation));

	useEffect(() => {
		const formationsByTeamSize = FORMATION_OPTIONS.filter(
			option => formationSize(option.value) === teamSize
		);
		const isFormation = formationsByTeamSize.find(option => option.value === formation);

		if (!formationsByTeamSize.length) {
			// If there are no formations by size of players then we need to add one. This shouldnt happen
			return;
		}

		if (isFormation) {
			setValue(isFormation);
		} else {
			setValue(formationsByTeamSize[0]);
			dispatch(setFormation(formationsByTeamSize[0].value));
		}
	}, [formation, teamSize, dispatch]);

	// Add formation selected to the store
	const handleChange = (selected: FormationOptionType | unknown) => {
		console.log('changed');
		dispatch(setFormation((selected as FormationOptionType).value));
	};
	const formationSize = (formationString: string) => {
		const a = formationString
			.split('-')
			.map(e => Number(e))
			.reduce((acc, curr) => acc + curr, 1); // '4-3-3' => ['4','3','3'] => 10 ( starts in 1 cause goalkeeper)
		return a;
	};

	return (
		<div style={{ minWidth }}>
			<p className='mb-1 text-sm'>Formación 👇</p>
			<CustomSelect
				placeholder='Formaciones'
				options={FORMATION_OPTIONS.filter(option => formationSize(option.value) === teamSize)}
				defaultValue={FORMATION_OPTIONS.find(option => option.value === formation)}
				value={value}
				hideSelectedOptions
				onChange={handleChange}
			/>
		</div>
	);
};
export default FormationSelect;

import CustomSelect from '@/components/CustomSelect';
import { FORMATION_SIZES } from '@/data/formationSizes';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setTeamSize } from '@/store/slices/formation';
import { TeamSizeOptionType } from '@/types/TeamSizeOptionType';
import { useEffect, useState } from 'react';

const TeamSizeSelector = () => {
	const dispatch = useAppDispatch();
	const { teamSize } = useAppSelector(state => state.formation);
	const [value, setValue] = useState(FORMATION_SIZES.find(size => size.value === teamSize));

	useEffect(() => {
		setValue(FORMATION_SIZES.find(size => size.value === teamSize));
	}, [teamSize]);

	// Add team size selected to the store
	const handleChange = (selected: TeamSizeOptionType | unknown) => {
		dispatch(setTeamSize((selected as TeamSizeOptionType).value));
	};
	return (
		<div>
			<p className='mb-1 text-sm'>Cantidad de jugadores 👇</p>
			<CustomSelect
				placeholder='Cantidad de jugadores'
				options={FORMATION_SIZES}
				defaultValue={FORMATION_SIZES.find(size => size.value === teamSize)}
				value={value}
				hideSelectedOptions
				onChange={handleChange}
			/>
		</div>
	);
};
export default TeamSizeSelector;

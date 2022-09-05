import CustomSelect from '@/components/CustomSelect';
import { FORMATION_SIZES } from '@/data/formationSizes';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setTeamSize } from '@/store/slices/formation';
import { TeamSizeOptionType } from '@/types/TeamSizeOptionType';

const TeamSizeSelector = () => {
	const dispatch = useAppDispatch();

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
				defaultValue={FORMATION_SIZES.find(size => size.value === 11)}
				hideSelectedOptions
				onChange={handleChange}
			/>
		</div>
	);
};
export default TeamSizeSelector;

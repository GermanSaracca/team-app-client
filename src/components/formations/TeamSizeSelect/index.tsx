import CustomSelect from '@/components/CustomSelect';
import SwalCustom from '@/components/CustomSwal';
import { FORMATION_SIZES } from '@/data';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { removeAllPlayerFromField, setTeamSize } from '@/store/slices/formation';
import { TeamSizeOptionType } from '@/types/TeamSizeOptionType';
import { useEffect, useState } from 'react';

const TeamSizeSelect = () => {
	const dispatch = useAppDispatch();
	const { teamSize, playersInField } = useAppSelector(state => state.formation);
	const [value, setValue] = useState(FORMATION_SIZES.find(size => size.value === teamSize));

	useEffect(() => {
		setValue(FORMATION_SIZES.find(size => size.value === teamSize));
	}, [teamSize]);

	// Add team size selected to the store
	const handleChange = (selected: TeamSizeOptionType | unknown) => {
		if (playersInField.length > 0) {
			SwalCustom.fire({
				title: `Si cambia la cantidad de jugadores ahora quitara los jugadores ya ubicados de la cancha.`,
				confirmButtonText: 'Si, continuar.',
				icon: 'warning',
				toast: true,
				position: 'top-right',
			}).then(result => {
				if (result.isConfirmed) {
					dispatch(setTeamSize((selected as TeamSizeOptionType).value));
					dispatch(removeAllPlayerFromField());
				}
			});
		} else {
			dispatch(setTeamSize((selected as TeamSizeOptionType).value));
			dispatch(removeAllPlayerFromField());
		}
	};
	return (
		<div>
			<p className='mb-1 text-sm'>Cantidad de jugadores 👇</p>
			<CustomSelect
				placeholder='Cantidad de jugadores'
				options={FORMATION_SIZES}
				defaultValue={FORMATION_SIZES.find(size => size.value === teamSize)}
				value={value}
				// hideSelectedOptions
				onChange={handleChange}
			/>
		</div>
	);
};
export default TeamSizeSelect;

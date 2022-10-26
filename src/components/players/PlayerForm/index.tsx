import { useState, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { POSITION_OPTIONS } from '@/data';
import CustomSelect from '@/components/CustomSelect';
import ImageUploading from '../ImageUploading';
import { PositionOptionType, IPlayer } from '@/types';
import { FiSave } from 'react-icons/fi';
import style from './index.module.scss';
import { MdClear } from 'react-icons/md';

type FormInputs = {
	name: string;
	position: PositionOptionType | null;
	avatar: string | null;
};

interface Props {
	mode: 'edit' | 'create';
	fullName?: IPlayer['fullName'];
	position?: IPlayer['position'] | null;
	avatar?: IPlayer['avatar'];
}

// eslint-disable-next-line react/display-name
const PlayerForm = ({ mode, fullName, position, avatar: oldImage }: Props) => {
	const [keepOldImg, setKeepOldImg] = useState<boolean>(mode === 'edit');
	const imageComponentRef = useRef<any>(null);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		watch,
		formState: { errors, isDirty },
	} = useForm<FormInputs>({
		defaultValues: {
			name: fullName ?? '',
			position: position ? POSITION_OPTIONS.find(option => option.value === position) : undefined,
			avatar: oldImage ?? null,
		},
	});

	const onSubmit: SubmitHandler<FormInputs> = data => {
		console.log(data);
		alert(JSON.stringify(data, null, 2));
		// Reset form
		reset();
		// Reset state of Image uploading component
		imageComponentRef?.current?.handleReset();
	};

	const handleAvatarChange = (value: string | null) => {
		setValue('avatar', value, { shouldValidate: true, shouldDirty: true });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.player_form}>
			{/* Name */}
			<div className={style.form_group}>
				<label htmlFor='name'>Nombre</label>
				<input
					className={style.name_input}
					type='text'
					id='name'
					placeholder='Ej: Lionel Messi'
					autoComplete='off'
					{...register('name', { required: true })}
				/>
				{errors.name && (
					<span className={style.error_span}>Por favor ingrese el nombre del jugador</span>
				)}
			</div>
			{/* Position */}
			<div className={style.form_group}>
				<label htmlFor='position'>Posición</label>
				<Controller
					defaultValue={POSITION_OPTIONS.find(option => option.value === position) ?? null}
					render={({ field }) => (
						<CustomSelect
							onChange={selectedOption => {
								if (selectedOption) {
									field.onChange(selectedOption);
								}
							}}
							options={POSITION_OPTIONS}
							value={field.value}
						/>
					)}
					rules={{ required: true }}
					name='position'
					control={control}
				/>
				{errors.position && (
					<span className={style.error_span}>Por favor seleccione el puesto del jugador</span>
				)}
			</div>

			{/* Image */}
			<div className={style.form_group}>
				<label>Imagen</label>
				{oldImage && keepOldImg && (
					<div className={style.old_image_preview_container}>
						<img src={oldImage} className={style.image_preview} alt='' />
						<button
							onClick={() => {
								setKeepOldImg(false);
								handleAvatarChange(null);
							}}
							type='button'
							title='Elegir otra foto'
						>
							<MdClear size={18} />
						</button>
					</div>
				)}
				{(!oldImage || !keepOldImg) && (
					<>
						<ImageUploading onAvatarChange={handleAvatarChange} ref={imageComponentRef} />
						<input type='hidden' id='avatar' {...register('avatar')} />

						{!watch('avatar') && (
							<span className={style.hint_span}>Se usara un avatar si no subes una imagen.</span>
						)}
					</>
				)}
			</div>

			<button
				className={style.save_player_btn}
				type='submit'
				disabled={mode === 'edit' && !isDirty}
			>
				<FiSave size={20} />
				Guardar Jugador
			</button>
		</form>
	);
};
export default PlayerForm;

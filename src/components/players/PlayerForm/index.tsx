import { useState, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addPlayer, updatePlayer } from '@/libs/firebase';
import ImageUploading from '../ImageUploading';
import CustomSelect from '@/components/CustomSelect';
import SwalCustom from '@/components/CustomSwal';
import { SpinnerEllipsis } from '@/components/Spinners';
import { PositionOptionType, IPlayer } from '@/types';
import { POSITION_OPTIONS } from '@/data';
import { FiSave } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import style from './index.module.scss';

type FormInputs = {
	fullNameForm: string;
	positionForm: PositionOptionType | null;
	avatarForm: string | null;
};

interface Props {
	mode: 'edit' | 'create';
	fullName?: IPlayer['fullName'];
	position?: IPlayer['position'];
	avatar?: IPlayer['avatar'];
	id?: IPlayer['id'];
	onSuccesfullOperation?: () => void;
}

const PlayerForm = ({ mode, fullName, position, avatar, id, onSuccesfullOperation }: Props) => {
	const [previousAvatar] = useState<IPlayer['avatar'] | null>(avatar ?? null);
	const [loading, setLoading] = useState<boolean>(false);
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
			fullNameForm: fullName ?? '',
			positionForm: position
				? POSITION_OPTIONS.find(option => option.value === position)
				: undefined,
			avatarForm: avatar ? avatar.url : null,
		},
	});

	const onSubmit: SubmitHandler<FormInputs> = async data => {
		const { fullNameForm, positionForm, avatarForm } = data;

		setLoading(true);

		try {
			if (mode === 'create') {
				let imageBlob;

				// Si el usuario quiere subir una imagen
				if (avatarForm) {
					// Hacemos fetch de ese object url de la imagen cropeada y recuperamos el blob
					const objectUrlData = await fetch(avatarForm);
					imageBlob = await objectUrlData.blob();
				}

				await addPlayer({
					fullName: fullNameForm,
					position: positionForm?.value as IPlayer['position'],
					imageBlob: imageBlob ?? null,
				});

				SwalCustom.fire({
					title: `Jugador ${fullNameForm} agregado al equipo!`,
					showDenyButton: false,
					showConfirmButton: false,
					icon: 'success',
					toast: true,
					position: 'top-start',
					showCloseButton: true,
					timer: 3000,
				});

				// Reset form
				reset();
				// Reset state of Image uploading component
				imageComponentRef?.current?.handleReset();

				// Update the store with new players
			}

			if (mode === 'edit') {
				let previousImageToDelete = null;
				let imageBlob = null;

				// Si tenia imagen y la quiere reemplazar
				if (avatarForm && previousAvatar && avatarForm.startsWith('blob')) {
					// Hacemos fetch de ese object url de la imagen cropeada y recuperamos el blob
					const objectUrlData = await fetch(avatarForm);
					imageBlob = await objectUrlData.blob();

					previousImageToDelete = previousAvatar;
				}

				// Si tenia imagen y la quiere borrar
				if (!avatarForm && previousAvatar) {
					previousImageToDelete = previousAvatar;
				}
				// NO tenia imagen y quiere agregar
				if (!previousAvatar && avatarForm) {
					// Hacemos fetch de ese object url de la imagen cropeada y recuperamos el blob
					const objectUrlData = await fetch(avatarForm);
					imageBlob = await objectUrlData.blob();
				}

				await updatePlayer({
					fullName: fullNameForm,
					position: positionForm?.value as IPlayer['position'],
					id,
					imageBlob,
					previousImageToDelete,
				});

				SwalCustom.fire({
					title: `Jugador ${fullNameForm} editado correctamente.`,
					showDenyButton: false,
					showConfirmButton: false,
					icon: 'success',
					toast: true,
					position: 'top-start',
					showCloseButton: true,
					timer: 3000,
				});

				// Reset form
				reset();
				// Reset state of Image uploading component
				imageComponentRef?.current?.handleReset();

				// Close parent modal
				onSuccesfullOperation && onSuccesfullOperation();
			}
		} catch (e) {
			console.error(e);

			SwalCustom.fire({
				title: `Ha ocurrido un error. Intente nuevamente`,
				showDenyButton: false,
				showConfirmButton: false,
				icon: 'error',
				toast: true,
				position: 'top-right',
				showCloseButton: true,
				timer: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleAvatarChange = (value: string | null) => {
		setValue('avatarForm', value, { shouldValidate: true, shouldDirty: true });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={style.player_form}>
			{/* Name */}
			<div className={style.form_group}>
				<label htmlFor='fullName'>Nombre Completo</label>
				<input
					className={style.name_input}
					type='text'
					id='fullName'
					placeholder='Ej: Lionel Messi'
					autoComplete='off'
					{...register('fullNameForm', { required: true })}
				/>
				{errors.fullNameForm && (
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
					name='positionForm'
					control={control}
				/>
				{errors.positionForm && (
					<span className={style.error_span}>Por favor seleccione el puesto del jugador</span>
				)}
			</div>

			{/* Image */}
			<div className={style.form_group}>
				<label>Imagen</label>
				{watch('avatarForm') && (
					<div className={style.old_image_preview_container}>
						<img src={watch('avatarForm') as string} className={style.image_preview} alt='' />
						<button
							onClick={() => {
								handleAvatarChange(null);
							}}
							type='button'
							title='Elegir otra foto'
						>
							<MdClear size={18} />
						</button>
					</div>
				)}
				{!watch('avatarForm') && (
					<>
						<ImageUploading onAvatarChange={handleAvatarChange} ref={imageComponentRef} />
						<input type='hidden' id='avatar' {...register('avatarForm')} />

						{!watch('avatarForm') && (
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
				{loading ? (
					<SpinnerEllipsis color='black' />
				) : (
					<>
						<FiSave size={20} />
						Guardar Jugador
					</>
				)}
			</button>
		</form>
	);
};
export default PlayerForm;

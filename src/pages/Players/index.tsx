import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAppSelector } from '@/hooks/reduxHooks';
import CustomSelect from '@/components/CustomSelect';
import PlayerBadge from '@/components/PlayerBadge';
import ImageUploading from '@/components/players/ImageUploading';
import { POSITION_OPTIONS } from '@/data';
import { FiSave } from 'react-icons/fi';
import style from './index.module.scss';
import { PositionOptionType } from '@/types';

type FormInputs = {
	name: string;
	position: PositionOptionType;
	userAvatar: string | null;
};

const Players = () => {
	const { players } = useAppSelector(state => state.players);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { errors },
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = data => {
		console.log(data);
		alert(JSON.stringify(data, null, 2));
		reset();
	};

	const handleAvatarChange = (value: string | null) => {
		setValue('userAvatar', value, { shouldValidate: true });
	};

	// TODO: Eliminar imagen de avatar programaticamente desde padre
	// TODO: Resetear campos luego de guardar y cargar satisfactoriamente un jugador
	// TODO: Editar jugador
	// TODO: Eliminar jugador

	return (
		<div className={style.players_layout}>
			{/* Add Player Form */}
			<div className={style.form_container}>
				<h3>Agrega un nuevo jugador 👇</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
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
							render={({ field }) => (
								<CustomSelect
									onChange={selectedOption => {
										if (selectedOption) {
											field.onChange(selectedOption);
										}
									}}
									options={POSITION_OPTIONS}
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
						<ImageUploading onAvatarChange={handleAvatarChange} />
						<input type='hidden' id='userAvatar' {...register('userAvatar', { required: true })} />
						{errors.userAvatar && (
							<span className={style.error_span}>Por favor seleccione una imagen de perfil</span>
						)}
					</div>

					<button className={style.save_player_btn} type='submit'>
						<FiSave size={20} />
						Agregar jugador
					</button>
				</form>
			</div>
			{/* End Add Player Form */}

			{/* Players Grid */}
			<div className={style.players_grid}>
				{players.map(p => (
					<PlayerBadge
						fullName={p.fullName}
						position={p.position}
						avatar={p.avatar}
						id={p.id}
						key={p.id}
						avatarDraggable={false}
					/>
				))}
			</div>
			{/* End Players Grid */}
		</div>
	);
};
export default Players;

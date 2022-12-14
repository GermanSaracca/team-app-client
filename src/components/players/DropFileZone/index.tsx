import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiErrorCircle } from 'react-icons/bi';
import classNames from 'classnames';
import style from './index.module.scss';

interface Props {
	onDropAccepted: (file: FileList) => void;
}

const DropFileZone = ({ onDropAccepted }: Props) => {
	const [fileErrors, setFileErrors] = useState<string | boolean>(false);

	const formatBytes = useCallback((bytes: number, decimals = 2) => {
		if (!+bytes) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	}, []);

	const MAX_SIZE = 1000000; // 1MB
	const MAX_SIZE_FORMATTED = formatBytes(MAX_SIZE);

	const handleDropRejected = (fileRejections: any) => {
		console.log('%cFile rejected', 'background-color: red;');

		const codeErrors = {
			'file-too-large': `La imagen no debe superar los ${MAX_SIZE_FORMATTED}`,
			'file-invalid-type': 'La imagen debe ser de tipo PNG, JPG y/ó JPEG.',
		};

		if (fileRejections) {
			const { errors } = fileRejections[0];
			const errorCode = errors[0].code;

			setFileErrors(codeErrors[errorCode as keyof typeof codeErrors]);
		} else {
			setFileErrors(true);
		}
	};

	const handleDropAccepted = (file: any) => {
		if (fileErrors) {
			console.log('%cErrors cleaned', 'background-color: yellowgreen;');
			setFileErrors(false);
		}
		onDropAccepted(file);
	};

	const { getRootProps, getInputProps, isDragAccept } = useDropzone({
		accept: {
			'image/png': ['.png'],
			'image/jpeg': ['.jpg', '.jpeg'],
		},
		multiple: false,
		maxSize: MAX_SIZE, // TODO: Agregar max size a los files luego!
		onDropRejected: handleDropRejected,
		onDropAccepted: handleDropAccepted,
	});

	// useEffect(() => {
	// 	// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
	// 	return () => {
	// 		selectedFile && URL.revokeObjectURL(selectedFile);
	// 	};
	// }, [selectedFile]);

	return (
		<section className={style.drop_file_zone}>
			<div
				{...getRootProps({ className: 'dropzone' })}
				className={classNames(style.dropzone, {
					[style.has_file_over]: isDragAccept,
					[style.has_file_error]: fileErrors,
				})}
			>
				<input {...getInputProps()} />
				<p className={style.usage_info}>
					Arrastra y suelta la imagen del jugador o haz click para buscar una.
				</p>
				{fileErrors && (
					<div className={style.file_error_msg}>
						<BiErrorCircle size={20} />
						{typeof fileErrors === 'string' && <small>{fileErrors}</small>}
						{typeof fileErrors === 'boolean' && (
							<small>Ha ocurrido un error al subir la imagen.</small>
						)}
					</div>
				)}
			</div>
		</section>
	);
};
export default DropFileZone;

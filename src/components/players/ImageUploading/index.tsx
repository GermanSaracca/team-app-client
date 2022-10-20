import { useState, useEffect, useCallback } from 'react';
import ImageCropper from '@/components/ImageCropper';
import DropFileZone from '../DropFileZone';
import { FiCheck } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import style from './index.module.scss';

interface Props {
	onAvatarChange: (avatar: string | null) => void;
}

const ImageUploading = ({ onAvatarChange }: Props) => {
	const [selectedFile, setSelectedFile] = useState<FileList | null>(null); // The file selected
	const [fileObjUrl, setFileObjUrl] = useState<string | null>(null); // The Object URL created from the file selected
	const [userImageUrl, setUserImageUrl] = useState<string | null>(null); // The Object URL created from the crop
	const [showPreview, setShowPreview] = useState<boolean>(false); // When user finish editing

	const handleReset = () => {
		setSelectedFile(null);
		setFileObjUrl(null);
		setUserImageUrl(null);
		setShowPreview(false);
		onAvatarChange(null);
	};

	const handleCancelCrop = () => {
		setSelectedFile(null);
		setFileObjUrl(null);
	};
	const handleSaveCroppedImage = () => {
		setShowPreview(true);
		onAvatarChange(userImageUrl);
	};

	useEffect(() => {
		if (selectedFile) {
			const objectUrl = URL.createObjectURL(selectedFile[0]);

			setFileObjUrl(objectUrl);

			setTimeout(() => {
				URL.revokeObjectURL(objectUrl);
			}, 1000);
		}
	}, [selectedFile]);

	const handleUrlCreated = useCallback((url: string) => {
		setUserImageUrl(url);
	}, []);

	return (
		<div className='mt-2'>
			{/* Drop file zone */}
			{!selectedFile && !fileObjUrl && (
				<DropFileZone onDropAccepted={file => setSelectedFile(file)} />
			)}

			{/* Image Cropping */}
			{!showPreview && selectedFile && fileObjUrl && (
				<div className={style.image_cropper_container}>
					<ImageCropper src={fileObjUrl} onUrlCreated={handleUrlCreated} />
					<div className={style.actions}>
						<button onClick={handleCancelCrop} type='button' title='Cancelar selección'>
							<MdClear size={18} />
						</button>
						<button onClick={handleSaveCroppedImage} type='button' title='Guardar selección'>
							<FiCheck size={18} />
						</button>
					</div>
				</div>
			)}
			{/* Image preview avatar */}
			{showPreview && userImageUrl && (
				<div className={style.image_preview_container}>
					<img src={userImageUrl} className={style.image_preview} alt='' />
					<button onClick={handleReset} type='button' title='Elegir otra foto'>
						<MdClear size={18} />
					</button>
				</div>
			)}
		</div>
	);
};
export default ImageUploading;

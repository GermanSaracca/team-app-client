import { useState, useEffect, useRef, useMemo } from 'react';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { imgPreview } from './imagePreview';

interface Props {
	src: string;
	onUrlCreated: (val: string) => void;
}

const ImageCropper = ({ src: imgSrc, onUrlCreated }: Props) => {
	const IMAGE_WIDTH = 200;
	const INITIAL_CROP: PixelCrop = useMemo(
		() => ({
			width: 125,
			height: 125,
			unit: 'px',
			x: 0,
			y: 0,
		}),
		[]
	);

	const imgRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState<PixelCrop>(INITIAL_CROP);
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

	// Crop saved after user iteraction
	useEffect(() => {
		async function generatePreviewURL() {
			if (completedCrop?.width && completedCrop?.height && imgRef.current) {
				const previewURL = await imgPreview(imgRef.current, completedCrop);
				onUrlCreated(previewURL);
			}
		}
		generatePreviewURL();
	}, [completedCrop, onUrlCreated]);

	// First auto crop
	useEffect(() => {
		function generatePreviewURL() {
			setTimeout(async () => {
				if (imgRef.current) {
					const previewURL = await imgPreview(imgRef.current, INITIAL_CROP);
					onUrlCreated(previewURL);
				}
			}, 100);
		}

		generatePreviewURL();
	}, [INITIAL_CROP, onUrlCreated]);

	if (!imgSrc) {
		return null;
	}

	return (
		<ReactCrop
			crop={crop}
			onChange={crop => setCrop(crop)}
			onComplete={c => setCompletedCrop(c)}
			aspect={1}
			circularCrop
		>
			<img src={imgSrc} ref={imgRef} width={IMAGE_WIDTH} alt='Crop me' />
		</ReactCrop>
	);
};

export default ImageCropper;

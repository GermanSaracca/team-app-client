import { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';

const CustomReactCrop = ({ src }: { src: string }) => {
	const [crop, setCrop] = useState<Crop>();
	return (
		<ReactCrop crop={crop} onChange={c => setCrop(c)}>
			<img src={src} />
		</ReactCrop>
	);
};
export default CustomReactCrop;

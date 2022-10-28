import { IMAGE_CROPPING_QUALITY } from '@/constants';
import { PixelCrop } from 'react-image-crop';
import { canvasPreview } from './canvasPreview';

let previewUrl = '';

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			blob => {
				if (blob) {
					resolve(blob);
				} else {
					reject(new Error('Could not generate blob'));
				}
			},
			'image/jpeg',
			IMAGE_CROPPING_QUALITY
		);
	});
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(image: HTMLImageElement, crop: PixelCrop) {
	const canvas = document.createElement('canvas');
	await canvasPreview(image, canvas, crop);

	const blob = await toBlob(canvas);

	if (previewUrl) {
		/* 
            The URL.revokeObjectURL() static method releases an existing object URL which was previously created by calling URL.createObjectURL().
            Call this method when you've finished using an object URL to let the browser know not to keep the reference to the file any longer.
        */
		URL.revokeObjectURL(previewUrl);
	}
	/* 
        The URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
        The URL lifetime is tied to the document in the window on which it was created. The new object URL represents the specified File object or Blob object.
    */
	previewUrl = URL.createObjectURL(blob);
	return previewUrl;
}

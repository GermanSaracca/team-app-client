import { useEffect } from 'react';

const usePreventDefaultDragOver = () => {
	useEffect(() => {
		const evPrevent = (e: any) => e.preventDefault();
		document.addEventListener('dragover', evPrevent);

		return () => {
			document.removeEventListener('dragover', evPrevent);
		};
	}, []);
};
export default usePreventDefaultDragOver;

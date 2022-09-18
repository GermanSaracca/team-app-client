import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';

interface IProps {
	children: React.ReactElement;
}

const DesktopOnlyPage = ({ children }: IProps) => {
	const { width } = useWindowSize();
	// TODO: Como manejar esto si con los pixeles ? con tipo de dispositivo? 1200 o menos , 1024 ?
	if (width && width >= 1200) {
		return children;
	}

	return (
		<h3>Esta pagina solo esta disponible desde una pc en una pantalla de al menos 1200 pixeles</h3>
	);
};
export default DesktopOnlyPage;

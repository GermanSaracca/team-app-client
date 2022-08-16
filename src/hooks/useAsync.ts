import { useEffect } from 'react';

/**
Para realizar una petición asíncrona y evitar realizar alguna accion si el componente ya se desmontó.
For example, if you want to make an asynchronous request and avoid performing any action if the component is unmounted.
*/

export const useAsync = (
	asyncFn: () => Promise<any>,
	successFunction: Function,
	returnFunction: Function,
	dependencies: any[] = []
) => {
	useEffect(() => {
		let isActive = true;

		asyncFn().then(result => {
			if (isActive) successFunction(result.data);
		});

		return () => {
			returnFunction && returnFunction();
			isActive = false;
		};
	}, dependencies);
};

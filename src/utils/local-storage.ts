// Search for key, if exist returns it, if not return the initial desired value
export const searchLocalStorage = (key: string, initialValue: any) => {
	const localStorageValue = window.localStorage.getItem(key);

	return localStorageValue ? JSON.parse(localStorageValue) : initialValue;
};
export const setLocalStorage = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
	window.localStorage.removeItem(key);
};

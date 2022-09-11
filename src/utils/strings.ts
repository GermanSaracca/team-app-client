/**
 *
 * @param fullName = 'John Doe'
 * @returns 'J. Doe' ( only if name has more than one word)
 */

export const firstNameToLetter = (fullName: string) => {
	const names = fullName.split(' ');

	if (names.length > 1) {
		const firstName = names[0];
		const secondName = names[1];

		return `${firstName.slice(0, 1)}. ${secondName}`;
	}
	console.warn('Couldnt apply changes on string because was one word name only');
	return fullName;
};

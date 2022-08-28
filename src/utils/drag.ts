export const toggleHtmlDraggClass = () => {
	const html = document.getElementsByTagName('html').item(0);
	html?.classList.toggle('grabbing');
};

import React from 'react';

export const toggleHtmlDraggClass = () => {
	const html = document.getElementsByTagName('html').item(0);
	html?.classList.toggle('grabbing');
};
export const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
	e.preventDefault();
};

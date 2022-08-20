import { ReactElement } from 'react';

export interface RouteType {
	path: string;
	element: ReactElement;
}

export interface AsideItemType {
	path: string;
	name: string;
	icon: ReactElement | null;
	aside?: boolean;
}

export type RoutesProps = RouteType & AsideItemType;

export interface Player {
	id?: number;
	fullName: string;
	position: 'Arquero' | 'Defensor' | 'Mediocampista' | 'Delantero';
	avatar: string;
}

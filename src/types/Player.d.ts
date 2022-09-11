export interface IPlayer {
	id?: number;
	fullName: string;
	position: 'Arquero' | 'Defensor' | 'Mediocampista' | 'Delantero';
	avatar: string;
	fieldPosition?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';
}

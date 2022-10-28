export interface IPlayer {
	id?: string;
	fullName: string;
	position: 'Arquero' | 'Defensor' | 'Mediocampista' | 'Delantero';
	avatar: { storagePath: string; url: string } | null;
	fieldPosition?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';
}

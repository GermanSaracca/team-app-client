import { IPlayer } from '@/types';
import {
	collection,
	addDoc,
	getDocs,
	doc,
	deleteDoc,
	setDoc,
	Firestore,
	QuerySnapshot,
	DocumentData,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, FirebaseStorage } from 'firebase/storage';
import { v4 } from 'uuid';

const PLAYERS_COLLECTION_NAME = 'players';

export const playersMethods = (db: Firestore, storage: FirebaseStorage) => {
	const playersCollectionRef = collection(db, PLAYERS_COLLECTION_NAME);

	// TODO:  Luego deberiamos buscar los players por id de equipo
	// TODO: Y tambien deberiamos guardar cada player por el id del equipo
	const getPlayers = async (): Promise<QuerySnapshot<DocumentData>> => {
		return getDocs(playersCollectionRef);
	};

	const addPlayer = async (data: {
		fullName: IPlayer['fullName'];
		position: IPlayer['position'];
		imageBlob: Blob | null;
	}): Promise<void> => {
		const { fullName, position, imageBlob } = data;

		try {
			let newImageUrl;

			if (imageBlob) {
				// Subimos la imagen al storage de Firebase
				const { storagePath, url } = await uploadPlayerImage(imageBlob);

				newImageUrl = {
					storagePath,
					url,
				};
			}

			await addDoc(collection(db, PLAYERS_COLLECTION_NAME), {
				fullName,
				position,
				avatar: newImageUrl ?? null,
			});
		} catch (e: any) {
			throw new Error(e);
		}
	};

	const updatePlayer = async (data: {
		fullName: IPlayer['fullName'];
		position: IPlayer['position'];
		id: IPlayer['id'];
		imageBlob: Blob | null;
		previousImageToDelete: IPlayer['avatar'];
	}): Promise<void> => {
		const { fullName, position, id, imageBlob, previousImageToDelete } = data;

		try {
			// Creo una referencia al jugador que quiero eliminar
			const playerRef = doc(db, PLAYERS_COLLECTION_NAME, id as string);

			let newImageUrl;

			// Elimino la imagen anterior ya que se reemplazo
			if (previousImageToDelete) {
				console.log('Eliminando imagen previa');

				const imageRef = ref(storage, previousImageToDelete.storagePath);
				await deleteObject(imageRef);
			}

			// Si recibimos un blob hay que subir la imagen al storage de Firebase
			if (imageBlob) {
				const { storagePath, url } = await uploadPlayerImage(imageBlob);

				console.log('Imagen nueva creada');

				newImageUrl = {
					storagePath,
					url,
				};
			}

			const updatedProperties: {
				fullName: IPlayer['fullName'];
				position: IPlayer['position'];
				avatar?: IPlayer['avatar'];
			} = {
				fullName,
				position,
			};

			// Si se agregar una nueva imagen
			if (newImageUrl) {
				updatedProperties.avatar = newImageUrl;
			}
			// Si no se agrego nueva imagen pero se borro la anterior
			if (previousImageToDelete && !newImageUrl) {
				updatedProperties.avatar = null;
			}

			// Piso el documento con los nuevos datos
			await setDoc(playerRef, updatedProperties, {
				merge: true,
			});
		} catch (e: any) {
			throw new Error(e);
		}
	};

	const deletePlayer = async (id: IPlayer['id'], avatar: IPlayer['avatar']): Promise<void> => {
		try {
			// Creo una referencia al jugador que quiero eliminar
			const playerRef = doc(db, PLAYERS_COLLECTION_NAME, id as string);

			// Elimino la imagen asociada al jugador
			if (avatar) {
				const imageRef = ref(storage, avatar.storagePath);
				await deleteObject(imageRef);
			}

			// Elimino el jugador a traves de la referencia al documento
			await deleteDoc(playerRef);
		} catch (e: any) {
			throw new Error(e);
		}
	};

	const uploadPlayerImage = async (file: File | Blob) => {
		// Where players images are saved inside the store Eg: players_avatars/120938129.jpg
		const storagePlayersRef = ref(storage, `players_avatars/${v4()}`);

		try {
			// Subo la imagen al storage y
			const { metadata } = await uploadBytes(storagePlayersRef, file);

			// Recupero el fullPath donde se guardo para eliminarlo en un futuro
			const storagePath = metadata.fullPath;

			// Recupero la url absoluta de la imagen que acabo de subir
			const url = await getDownloadURL(storagePlayersRef);

			return {
				url,
				storagePath,
			};
		} catch (e: any) {
			throw new Error(e);
		}
	};

	return {
		getPlayers,
		addPlayer,
		updatePlayer,
		deletePlayer,
	};
};

// Import the functions you need from the SDKs you need
import { IPlayer } from '@/types';
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
	deleteDoc,
	setDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
// import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

// ** Firebase FIRESTORE ( DATA )   ** //
export const db = getFirestore(app);
// ** Firebase STORAGE ( MEDIA )  ** //
const storage = getStorage(app);

const PLAYERS_COLLECTION_NAME = 'players';

const playersCollectionRef = collection(db, PLAYERS_COLLECTION_NAME);

// TODO:  Luego deberiamos buscar los players por id de equipo
// TODO: Y tambien deberiamos guardar cada player por el id del equipo
export const getPlayers = async (): Promise<IPlayer[]> => {
	try {
		const snapshot = await getDocs(playersCollectionRef);

		const players: IPlayer[] = [];

		snapshot.docs.forEach(doc => {
			players.push({
				...(doc.data() as {
					avatar: IPlayer['avatar'];
					position: IPlayer['position'];
					fullName: IPlayer['fullName'];
				}),
				id: doc.id,
			});
		});

		return players;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const addPlayer = async (data: {
	fullName: IPlayer['fullName'];
	position: IPlayer['position'];
	imageBlob: Blob | null;
}): Promise<string> => {
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

		const docRef = await addDoc(collection(db, PLAYERS_COLLECTION_NAME), {
			fullName,
			position,
			avatar: newImageUrl ?? null,
		});

		return docRef.id;
	} catch (e: any) {
		throw new Error(e);
	}
};

export const updatePlayer = async (data: {
	fullName: IPlayer['fullName'];
	position: IPlayer['position'];
	id: IPlayer['id'];
	imageBlob: Blob | null;
	deletePreviousImage: IPlayer['avatar'];
}): Promise<void> => {
	const { fullName, position, id, imageBlob, deletePreviousImage } = data;

	try {
		// Creo una referencia al jugador que quiero eliminar
		const playerRef = doc(db, PLAYERS_COLLECTION_NAME, id as string);

		let newImageUrl;

		// Elimino la imagen anterior ya que se reemplazo
		if (deletePreviousImage) {
			console.log('Eliminando imagen previa');

			const imageRef = ref(storage, deletePreviousImage.storagePath);
			await deleteObject(imageRef);
		}

		// Si recibimos un blob hay que subir la imagen
		if (imageBlob) {
			// Subimos la imagen al storage de Firebase
			const { storagePath, url } = await uploadPlayerImage(imageBlob);

			console.log('Imagen nueva creada');

			newImageUrl = {
				storagePath,
				url,
			};
		}

		await setDoc(
			playerRef,
			{
				fullName,
				position,
				avatar: newImageUrl ?? null,
			},
			{
				merge: false,
			}
		);
	} catch (e: any) {
		throw new Error(e);
	}
};

export const deletePlayer = async (id: IPlayer['id'], avatar: IPlayer['avatar']): Promise<void> => {
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

export const uploadPlayerImage = async (file: File | Blob) => {
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

// const analytics = getAnalytics(app);

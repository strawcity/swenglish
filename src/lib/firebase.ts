// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, get, child, update } from "firebase/database";
import { isAuthed, relationsResponse } from "./../../src/stores/session";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESAGE_SENDER,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
	databaseURL: import.meta.env.VITE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);
const dbRef = ref(database);
// const analytics = getAnalytics(app);

export async function getAuthenticated() {
	signInAnonymously(auth)
		.then(() => {
			isAuthed.set(true);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ...
		});
}

export function writeNewRelation(
	relationIndex: number,
	englishConcept: string,
	swedishConcept: string
) {
	set(ref(database, `relations/${relationIndex}`), {
		english: { concept: englishConcept, votes: 0 },
		swedish: { concept: swedishConcept, votes: 0 }
	});
}

export async function getData() {
	signInAnonymously(auth)
		.then(() => {
			let response = get(child(dbRef, "relations/"))
				.then((snapshot) => {
					if (snapshot.exists()) {
						relationsResponse.set(snapshot.val());
						return snapshot.val();
					} else {
						console.log("No data available");
					}
				})
				.catch((error) => {
					console.error(error);
				});
			return response;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ...
		});
}

export function vote(step: number, language: string) {
	let countValue;

	relationsResponse.subscribe((value) => {
		countValue = value;
	});
	if (countValue) {
		const updates: any = {};
		updates[`/relations/${step}/${language}/votes`] =
			countValue[step][language].votes + 1;

		update(ref(database), updates);
	}
}

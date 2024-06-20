import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue, child, push, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const cong = initializeApp(firebaseConfig);
export const analytics = getAnalytics(cong);

export async function getCities(setData) {
  const database = getDatabase(cong);

  const collectionRef = ref(database, 'cities');

  onValue(collectionRef, (snapshot) => {
    const dataItem = snapshot.val();

    if (dataItem) {
      const displayItem = Object.values(dataItem);
      setData(displayItem);
    }
  });
}

export function writeNewCity(postData) {
  const db = getDatabase();

  const newPostKey = push(child(ref(db), 'cities')).key;

  const updates = {};
  updates['/cities/' + newPostKey] = postData;

  return update(ref(db), updates);
}

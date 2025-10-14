import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase';

export function fetchAllWords(uid, onFinish) {
  const db = getFirestore(app);

  try {
    const financialRef = query(collection(db, 'words'), where('user', '==', uid));

    return onSnapshot(financialRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => data.push(doc.data()));

      onFinish(data);
    });
  } catch (e) {
    console.error('Error fetching document: ', e);
  }
}

export async function insertWord(uid, data) {
  const db = getFirestore(app);
  data.user = uid;

  try {
    const docRef = await addDoc(collection(db, 'words'), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

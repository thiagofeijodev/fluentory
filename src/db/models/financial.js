import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase';

export function fetchAllFinancial(uid, onFinish) {
  const db = getFirestore(app);

  try {
    const financialRef = query(collection(db, 'financial'), where('user', '==', uid));

    return onSnapshot(financialRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => data.push(doc.data()));

      onFinish(data);
    });
  } catch (e) {
    console.error('Error fetching document: ', e);
  }
}

export async function insertFinancial(uid, data) {
  const db = getFirestore(app);
  data.user = uid;

  try {
    const docRef = await addDoc(collection(db, 'financial'), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

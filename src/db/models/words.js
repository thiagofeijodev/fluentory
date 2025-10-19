import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase';

export function fetchAllWords(uid, onFinish) {
  const db = getFirestore(app);

  try {
    const financialRef = query(collection(db, 'words'), where('user', '==', uid));

    return onSnapshot(financialRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));

      onFinish(data);
    });
  } catch (e) {
    console.error('Error fetching document: ', e);
  }
}

export async function insertWord(uid, data) {
  const db = getFirestore(app);
  data.user = uid;
  data.status = data.status || 'learning';

  try {
    const docRef = await addDoc(collection(db, 'words'), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function updateWordStatus(wordId, newStatus) {
  const db = getFirestore(app);

  try {
    const wordRef = doc(db, 'words', wordId);
    await updateDoc(wordRef, { status: newStatus });
    console.log('Word status updated: ', wordId);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
}

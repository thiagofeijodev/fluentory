import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { query, where, onSnapshot, getDocs } from 'firebase/firestore';
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

export async function insertWord(uid, data, maxWordsLimit = null) {
  const db = getFirestore(app);
  data.user = uid;
  data.status = data.status || 'learning';
  data.difficulty = data.difficulty || 'medium';

  try {
    // Check word limit if maxWordsLimit is provided
    if (maxWordsLimit !== null) {
      const wordsQuery = query(collection(db, 'words'), where('user', '==', uid));
      const querySnapshot = await getDocs(wordsQuery);

      if (querySnapshot.size >= maxWordsLimit) {
        throw new Error(`Word limit exceeded. Maximum allowed: ${maxWordsLimit}`);
      }
    }

    const docRef = await addDoc(collection(db, 'words'), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
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

export async function updateWord(wordId, data) {
  const db = getFirestore(app);

  try {
    const wordRef = doc(db, 'words', wordId);
    await updateDoc(wordRef, data);
    console.log('Word updated: ', wordId);
  } catch (e) {
    console.error('Error updating document: ', e);
  }
}

export async function deleteWord(wordId) {
  const db = getFirestore(app);

  try {
    await deleteDoc(doc(db, 'words', wordId));
    console.log('Word deleted: ', wordId);
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}

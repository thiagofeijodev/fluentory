// import { getDatabase, ref, onValue, child, push, update, query, orderByChild, equalTo } from 'firebase/database';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { query, orderBy, limit, where } from 'firebase/firestore';
import { app } from '../firebase';

export async function fetchAllAccounts(setData) {
  const db = getFirestore(app);

  try {
    const accountsRef = query(collection(db, 'accounts'), where('name', '==', 'name'));
    const querySnapshot = await getDocs(accountsRef);

    const data = [];
    querySnapshot.forEach((doc) => data.push(doc.data()));

    setData(data);
  } catch (e) {
    console.error('Error fetching document: ', e);
  }
}

export async function insertAccount(data) {
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, 'accounts'), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Membre } from '../types';

const COLLECTION_NAME = 'team';

export async function getTeamMembers() {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Membre[];
}

export async function addTeamMember(member: Omit<Membre, 'id'>) {
  return await addDoc(collection(db, COLLECTION_NAME), member);
}

export async function updateTeamMember(id: string, data: Partial<Membre>) {
  const memberRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(memberRef, data);
}

export async function deleteTeamMember(id: string) {
  const memberRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(memberRef);
}

export async function searchTeamMembers(searchTerm: string) {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('nom', '>=', searchTerm),
    where('nom', '<=', searchTerm + '\uf8ff')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Membre[];
}
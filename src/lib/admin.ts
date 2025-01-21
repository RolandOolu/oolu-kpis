import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types';

export async function getAllUsers(): Promise<User[]> {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  return usersSnapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  })) as User[];
}

export async function updateUserRole(userId: string, userData: Partial<User>) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    role: userData.role,
    status: userData.status,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteUser(userId: string) {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
}
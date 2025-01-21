import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { KPI } from '../types';

const COLLECTION_NAME = 'kpis';

export async function getKPIs() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as KPI[];
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return [];
  }
}

export async function addKPI(kpi: Omit<KPI, 'id'>) {
  const kpiData = {
    ...kpi,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    valeur: kpi.valeur || 0,
    tendance: kpi.tendance || 'stable'
  };

  return await addDoc(collection(db, COLLECTION_NAME), kpiData);
}

export async function updateKPI(id: string, data: Partial<KPI>) {
  const kpiRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(kpiRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteKPI(id: string) {
  try {
    const kpiRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(kpiRef);
  } catch (error) {
    console.error('Error deleting KPI:', error);
    throw error;
  }
}
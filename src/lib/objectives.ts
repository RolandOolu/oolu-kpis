import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Objectif, KeyResult } from '../types';

const OBJECTIVES_COLLECTION = 'objectives';
const KEY_RESULTS_COLLECTION = 'keyResults';

// Helper function to organize objectives into a tree structure
function buildObjectiveTree(objectives: Objectif[]): Objectif[] {
  const objectiveMap = new Map<string, Objectif>();
  const rootObjectives: Objectif[] = [];

  // First pass: Create a map of all objectives
  objectives.forEach(obj => {
    objectiveMap.set(obj.id, { ...obj, children: [] });
  });

  // Second pass: Organize into tree structure
  objectives.forEach(obj => {
    const objective = objectiveMap.get(obj.id)!;
    if (obj.parentId && objectiveMap.has(obj.parentId)) {
      const parent = objectiveMap.get(obj.parentId)!;
      parent.children = parent.children || [];
      parent.children.push(objective);
    } else {
      rootObjectives.push(objective);
    }
  });

  return rootObjectives;
}

export async function getObjectives() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, OBJECTIVES_COLLECTION), orderBy('createdAt', 'desc'))
    );
    
    const objectives = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const objective = { id: doc.id, ...doc.data() } as Objectif;
        
        // Get key results for this objective
        const krSnapshot = await getDocs(
          query(
            collection(db, KEY_RESULTS_COLLECTION),
            where('objectiveId', '==', doc.id)
          )
        );
        
        objective.keyResults = krSnapshot.docs.map(
          kr => ({ id: kr.id, ...kr.data() } as KeyResult)
        );
        
        return objective;
      })
    );

    // Organize objectives into a tree structure
    return buildObjectiveTree(objectives);
  } catch (error) {
    console.error('Error fetching objectives:', error);
    return [];
  }
}

export async function addObjective(objective: Omit<Objectif, 'id'>) {
  const objectiveData = {
    ...objective,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progression: objective.progression || 0,
    statut: objective.statut || 'en_cours'
  };

  const objectiveRef = await addDoc(collection(db, OBJECTIVES_COLLECTION), objectiveData);

  // Add key results
  if (objective.keyResults?.length) {
    await Promise.all(
      objective.keyResults.map(kr =>
        addDoc(collection(db, KEY_RESULTS_COLLECTION), {
          ...kr,
          objectiveId: objectiveRef.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      )
    );
  }

  return objectiveRef;
}

export async function updateObjective(id: string, data: Partial<Objectif>) {
  const objectiveRef = doc(db, OBJECTIVES_COLLECTION, id);
  const updateData = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  delete updateData.keyResults; // Remove key results from objective update
  await updateDoc(objectiveRef, updateData);

  // Update key results if provided
  if (data.keyResults?.length) {
    await Promise.all(
      data.keyResults.map(kr =>
        updateDoc(doc(db, KEY_RESULTS_COLLECTION, kr.id), {
          ...kr,
          updatedAt: new Date().toISOString()
        })
      )
    );
  }
}

export async function deleteObjective(id: string) {
  try {
    // Delete key results first
    const krSnapshot = await getDocs(
      query(collection(db, KEY_RESULTS_COLLECTION), where('objectiveId', '==', id))
    );
    
    await Promise.all(
      krSnapshot.docs.map(doc => deleteDoc(doc.ref))
    );

    // Then delete the objective
    await deleteDoc(doc(db, OBJECTIVES_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting objective:', error);
    throw error;
  }
}
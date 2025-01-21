import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app, db } from './firebase';
import { AuthUser, Membre } from '../types';

const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if user exists in team collection
    const teamQuery = query(
      collection(db, 'team'),
      where('email', '==', email)
    );
    const teamSnapshot = await getDocs(teamQuery);
    
    if (teamSnapshot.empty) {
      // Create team member if doesn't exist
      const memberData: Omit<Membre, 'id'> = {
        nom: email.split('@')[0].replace('.', ' '),
        email: email,
        poste: 'Membre',
        photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
        equipe: 'Général',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const newTeamRef = doc(collection(db, 'team'));
      await setDoc(newTeamRef, memberData);
      
      // Update user profile with member data
      const userRef = doc(db, 'users', userCredential.user.uid);
      await updateDoc(userRef, {
        membre: {
          ...memberData,
          id: newTeamRef.id
        }
      });
    }

    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    const memberData: Omit<Membre, 'id'> = {
      nom: email.split('@')[0].replace('.', ' '),
      email: email,
      poste: 'Membre',
      photo: 'https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png',
      equipe: 'Général',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Create team member
    const newTeamRef = doc(collection(db, 'team'));
    await setDoc(newTeamRef, memberData);

    // Create user with member reference and default role
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: email,
      role: 'member', // Set default role to member
      status: 'active',
      membre: {
        ...memberData,
        id: newTeamRef.id
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Un compte existe déjà avec cet email.');
    }
    throw error;
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
  // Clear hash and force reload to ensure clean state
  window.location.hash = '';
  window.location.reload();
};

export const getCurrentUser = (): Promise<AuthUser | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            resolve({
              uid: user.uid,
              email: user.email!,
              role: userData?.role || 'member', // Default to member if role is not set
              membre: userData?.membre || null
            });
          } catch (error) {
            console.error('Error getting user data:', error);
            resolve({
              uid: user.uid,
              email: user.email!,
              role: 'member', // Default to member
              membre: null
            });
          }
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};

export const updateProfile = async (uid: string, profileData: any) => {
  const userRef = doc(db, 'users', uid);
  
  // If member ID is provided, update team member
  if (profileData.id) {
    const teamRef = doc(db, 'team', profileData.id);
    const updatedData = {
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    // Update both user profile and team member
    await Promise.all([
      updateDoc(userRef, {
        membre: updatedData
      }),
      updateDoc(teamRef, updatedData)
    ]);
  } else {
    // Only update user profile
    await updateDoc(userRef, {
      membre: {
        ...profileData,
        updatedAt: new Date().toISOString()
      }
    });
  }
};
// authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail  } from 'firebase/auth';
import { auth, db } from '../src/firebaseConection';



export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const  signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential;
  } catch (error) {
    throw error;
  }
  
};

// authService.js
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};


export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
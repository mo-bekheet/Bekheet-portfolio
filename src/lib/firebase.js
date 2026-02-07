// Firebase configuration
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import app from './firebaseApp';

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export const auth = getAuth(app);

// For emulator support in development
if (import.meta.env.DEV) {
  // Uncomment these lines when using Firebase emulators
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
  // connectFunctionsEmulator(functions, 'localhost', 5001);
}
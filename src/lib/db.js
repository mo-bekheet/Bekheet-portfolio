// Database utilities
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

// Generic CRUD operations
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const readDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error reading document:', error);
    throw error;
  }
};

export const readCollection = async (collectionName, filters = [], sortField = null, limitCount = null) => {
  try {
    let q = collection(db, collectionName);
    
    // Apply filters
    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });
    
    // Apply sorting
    if (sortField) {
      q = query(q, orderBy(sortField.field, sortField.direction || 'asc'));
    }
    
    // Apply limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error reading collection:', error);
    throw error;
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Specific content retrieval functions
export const getContent = async (contentType) => {
  return await readCollection(contentType);
};

export const getProfileContent = async () => {
  const profileData = await readCollection('profiles');
  return profileData.length > 0 ? profileData[0] : null;
};

export const getProjects = async () => {
  return await readCollection('projects', [], { field: 'createdAt', direction: 'desc' });
};

export const getSkills = async () => {
  return await readCollection('skills', [], { field: 'category' });
};

export const getExperience = async () => {
  return await readCollection('experience', [], { field: 'startDate', direction: 'desc' });
};
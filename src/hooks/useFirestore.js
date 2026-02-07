// Custom hook for Firestore data fetching
import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirestore = (collectionName, filters = [], sortField = null, limitCount = null) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(docs);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [collectionName, JSON.stringify(filters), JSON.stringify(sortField), limitCount]);

  return { documents, loading, error };
};

export const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!docId) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, collectionName, docId);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() });
        } else {
          setDocument(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, loading, error };
};
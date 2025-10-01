import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // importante per mostrare un loader

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return { user, loading };
};

const auth = getAuth();

await setPersistence(auth, browserLocalPersistence);

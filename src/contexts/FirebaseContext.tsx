
import React, { createContext, useContext, ReactNode } from 'react';
import { auth, db, storage } from '@/lib/firebase';

type FirebaseContextType = {
  auth: typeof auth;
  db: typeof db;
  storage: typeof storage;
};

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    auth,
    db,
    storage,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

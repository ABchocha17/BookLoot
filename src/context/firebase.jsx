import React, { createContext, useContext, useEffect, useState } from 'react';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: 'AIzaSyCVFWg-taZroBNTrOVP9ljrLiB6KojPk2E',
  authDomain: 'book-loot.firebaseapp.com',
  projectId: 'book-loot',
  storageBucket: 'book-loot.appspot.com',
  messagingSenderId: '862313643264',
  appId: '1:862313643264:web:255101da4917c0a67007e5'
};

export const useFirebase = () => useContext(firebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = (email,password) => createUserWithEmailAndPassword(firebaseAuth,email,password);
  const signInUserWithEmailAndPassword = (email,password) => signInWithEmailAndPassword(firebaseAuth,email,password);
  const signInWithGoogle = () => signInWithPopup(firebaseAuth,googleProvider);

  const [user,setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  },[])

  const isLoggedIn = user ? true : false;

  return (
    <firebaseContext.Provider value={{signUpUserWithEmailAndPassword,signInUserWithEmailAndPassword,signInWithGoogle,isLoggedIn}}>
      {props.children}
    </firebaseContext.Provider>
  );
};

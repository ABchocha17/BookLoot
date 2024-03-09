import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, uploadBytes, ref,getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs,doc,getDoc,query,where } from 'firebase/firestore';

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
const Storage = getStorage(firebaseApp);
const Firestore = getFirestore(firebaseApp);


export const FirebaseProvider = (props) => {
    const signUpUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);
    const signInUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);
    const signInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    const isLoggedIn = user ? true : false;

    const addNewBook = async (bookname, ISBN, price, bookimg) => {
        const bookimgRef = ref(Storage, `uploads/images/books/${Date.now()}-${bookimg.name}`);
        const bookUploadImg = await uploadBytes(bookimgRef, bookimg);
        return await addDoc(collection(Firestore, "books"), {
            bookname,
            ISBN,
            price,
            bookImgUrl: bookUploadImg.ref.fullPath,
            userName: user?.displayName,
            userEmail: user.email,
            userId: user.uid
        });
    };

    const getAllBooks = async () => {
        const querySnapshot = await getDocs(collection( Firestore , "books"));
        return querySnapshot;
    };

    const getImageUrl = (path) => {
      return getDownloadURL(ref(Storage,path))
    }

    const getBookById = async(id) =>{
        const docRef = doc(Firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
      }
      
    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(Firestore, 'books', bookId, 'orders');
        const result = await addDoc(collectionRef, {
            userName: user?.displayName,
            userEmail: user?.email,
            userId: user?.uid,
            qty: Number(qty)
        });
        return result;
    };

    const fetchBooks = async (userId) => {
        const collectionRef = collection(Firestore, 'books');
        const q = query(collectionRef, where("userId", "==", userId));
        const books = await getDocs(q);
        return books;
    };
    
    const getOrders = async (bookId) => {
        const collectionRef = collection(Firestore, "books" ,bookId,"orders");
        const result = await getDocs(collectionRef);
        return result;
    };  
    
    return (
        <firebaseContext.Provider value={{ fetchBooks,signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword, signInWithGoogle, isLoggedIn, addNewBook, getAllBooks,getImageUrl,getBookById,placeOrder,user,getOrders }}>
            {props.children}
        </firebaseContext.Provider>
    );
};



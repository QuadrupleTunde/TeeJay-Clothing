import { initializeApp } from 'firebase/app';
import {
   getAuth,signInWithPopup, 
   signInWithRedirect, 
   createUserWithEmailAndPassword, 
   GoogleAuthProvider, 
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
  } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiqzMHh72dJpB4Qn4hg-TJpmiCRAyxRa8",
    authDomain: "teejay-clothing-db.firebaseapp.com",
    projectId: "teejay-clothing-db",
    storageBucket: "teejay-clothing-db.appspot.com",
    messagingSenderId: "418277185676",
    appId: "1:418277185676:web:70fc12e3f0b755d8d103a9"
  };
  
  // Initialize Firebase
   initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore()

export const addCollectionAndDocuments = async(
  collectionKey, 
  objectsToAdd,
  field = 'title') =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })
  await batch.commit()
  console.log("done")
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q);
  const categoryMap =querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}


export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'user', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch(error){
      console.log('error creating the user', error.message)
    }
  }
  return  userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password)
}

export const SignOutUser = async () =>{
  await signOut(auth)
}

export const onAuthStateChangedListener =(callback)=> onAuthStateChanged(auth, callback)
import { initializeApp } from 'firebase/app';
import { getAuth,signInWithPopup, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'user', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot)
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error){
      console.log('error creating the user', error.message)
    }
  }
  return  userDocRef
}

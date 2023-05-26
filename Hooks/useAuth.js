import firebase from 'firebase/app';
import 'firebase/auth';
import { app } from '../config/firebase';
import * as SecureStore from 'expo-secure-store';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc  } from "firebase/firestore";
import { useContext } from 'react';
import NavContext from '../NavContext';

const auth = getAuth(app);
const db = getFirestore(app);

export const getNamesFromEmail =async(email, token)=>{
    console.log('email document', email)
    if(email){
        try{
            const docRef = doc(db, "users", email);
            const docSnap = await getDoc(docRef);
            console.log('docSnap', docSnap.data())
            if (docSnap.exists()) {
                console.log('expected data', [docSnap.data().firstName, docSnap.data().lastName])
                return {name:[docSnap.data().firstName, docSnap.data().lastName], email, token}
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                return null
            }
        }catch(err){
            return null
            
        }
    }else{
        return
    }
  }

export const registerWithEmailAndPassword = async (email, firstName, lastName, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('here', user);
        
        // Save additional user data (first name, last name) to Firebase Firestore
    class User {
        constructor(email, firstName, lastName) {
            this.email = email.trim();
            this.firstName = firstName.toLowerCase().trim();
            this.lastName = lastName.toLowerCase().trim();
        }
    }
    
    const userData = new User(email, firstName, lastName);
    
    await setDoc(doc(db, "users", user.email), {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    });

    return getNamesFromEmail(user.email, user.stsTokenManager.accessToken);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signOutAUser = async () => {
     const result = await signOut(auth).then(() => {
        return 'Sign out success'
        // Sign-out successful.
      }).catch((error) => {
        console.log('signout failed error', error)
        return `Sign out failed: ${error}`
        // An error happened.
      });
      console.log('signout result', result)
      return result
};

export const signinWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('here', user);

    return getNamesFromEmail(user.email, user.stsTokenManager.accessToken);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const storeAccessToken = async (accessToken) => {
    try {
      await SecureStore.setItemAsync('accessToken', accessToken);
    } catch (error) {
      // Handle error
    }
  };
  
  // Retrieving the access token
 export const getAccessToken = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      return accessToken;
    } catch (error) {
      // Handle error
      return null;
    }
  };

export const removeAccessToken = async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      console.log('Access token removed successfully.');
    } catch (error) {
      // Handle error
      console.log('Error removing access token:', error);
    }
  };

 
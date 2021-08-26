import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAbEj-bu4eezp-mU2-CJoiODWWorgVlx2I",
    authDomain: "crown-db-96f60.firebaseapp.com",
    projectId: "crown-db-96f60",
    storageBucket: "crown-db-96f60.appspot.com",
    messagingSenderId: "1048026899941",
    appId: "1:1048026899941:web:9a6dfde2755726bcb97b0c",
    measurementId: "G-5F0Z9LFPHF"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if (!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await  userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
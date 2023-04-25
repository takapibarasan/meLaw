import firebase from 'firebase/app';
import 'firebase/firestore'; //firestoreを使う場合
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCe9VYyax8uql5U7caa-abUm0BTCskjXiA',
  authDomain: 'melaw-f6e92.firebaseapp.com',
  projectId: 'melaw-f6e92',
});

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const db = firebase.firestore(); //firestoreを使う場合
export default firebase;

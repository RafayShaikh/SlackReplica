import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC-Kt4oUjJf-oMqvfn3lqE8MBZU1QtZdWU',
  authDomain: 'slackreplica-511d8.firebaseapp.com',
  projectId: 'slackreplica-511d8',
  storageBucket: 'slackreplica-511d8.appspot.com',
  messagingSenderId: '331334505497',
  appId: '1:331334505497:web:aa965f3543889c41858688',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };

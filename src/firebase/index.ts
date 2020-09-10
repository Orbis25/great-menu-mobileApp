import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from './config.json';

const Config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

// Initialize Firebase
export const firebaseConfig = firebase.initializeApp(Config);

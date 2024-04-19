import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDrSo3LPBfJtt58ozN2-5uB3cetrpqjoJg',
  authDomain: 'sharathuk-1.firebaseapp.com',
  projectId: 'sharathuk-1',
  storageBucket: 'sharathuk-1.appspot.com',
  messagingSenderId: '398253293708',
  appId: '1:398253293708:web:c39536ed07cf6c73f3bba9',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

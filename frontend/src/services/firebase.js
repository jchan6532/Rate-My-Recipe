// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCpOdi0zLCLn6fjXwPViv4QkWK3HMWl18A',
  authDomain: 'rate-my-recipe-992cb.firebaseapp.com',
  projectId: 'rate-my-recipe-992cb',
  storageBucket: 'rate-my-recipe-992cb.appspot.com',
  messagingSenderId: '68006043064',
  appId: '1:68006043064:web:1515a9512a9052b440c34d',
  measurementId: 'G-VF0G9NQ49C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

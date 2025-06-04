import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyBRR4P9TWDEUCWNVMZlJ4IBzFmabVwbktI',
  authDomain: 'react-learning-project-1-fb.firebaseapp.com',
  projectId: 'react-learning-project-1-fb',
  storageBucket: 'react-learning-project-1-fb.firebasestorage.app',
  messagingSenderId: '590150725181',
  appId: '1:590150725181:web:dc23ce99d135ac3a87c454',
  measurementId: 'G-WDG9XR6P09',
  databaseURL:
    'https://react-learning-project-1-fb-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

// const analytics = getAnalytics(app)

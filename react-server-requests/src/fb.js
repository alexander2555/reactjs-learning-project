import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: 'AIzaSyBRR4P9TWDEUCWNVMZlJ4IBzFmabVwbktI',
  authDomain: 'react-learning-project-1-fb.firebaseapp.com',
  databaseURL:
    'https://react-learning-project-1-fb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-learning-project-1-fb',
  storageBucket: 'react-learning-project-1-fb.firebasestorage.app',
  messagingSenderId: '590150725181',
  appId: '1:590150725181:web:ef6e74bbf6b288bf87c454',
  measurementId: 'G-L0SSRMWNV3',
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const db = getDatabase(app)

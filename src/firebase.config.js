// Firebase App is always required and must be first
import firebase from 'firebase/app'

// Add additional services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}
export const Firebase = firebase.initializeApp(config)
export const FirebaseAuth = firebase.auth()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const firestore = Firebase.firestore()
Firebase.firestore().enablePersistence({ synchronizeTabs: true })

// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getStorage } from 'firebase/storage'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: 'AIzaSyBiB_Qg9OhB3YS3XqPtzLctGDxZt25nyF4',
  authDomain: 'insta-fcbdc.firebaseapp.com',
  projectId: 'insta-fcbdc',
  storageBucket: 'insta-fcbdc.appspot.com',
  messagingSenderId: '9561826276',
  appId: '1:9561826276:web:4e5dbe1bc9fe57c9d41df1',
}

export const app = initializeApp(firebaseConfig)

// const auth = getAuth(app)
// const storage = getStorage(app)

// export { storage, auth }

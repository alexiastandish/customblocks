import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: 'AIzaSyC4j26aHs5foeJhOvDK2oL8gVhp2-qWco0',
    authDomain: 'codeblocks-mvp-636b8.firebaseapp.com',
    databaseURL: 'https://codeblocks-mvp-636b8-default-rtdb.firebaseio.com',
    projectId: 'codeblocks-mvp-636b8',
    storageBucket: 'codeblocks-mvp-636b8.appspot.com',
    messagingSenderId: '492967059688',
    appId: '1:492967059688:web:149020058a99723ba4e95d',
    measurementId: 'G-2SVRE3V62H',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

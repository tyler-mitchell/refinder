import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBdhd3g3f8DkpMB8DmmLrlXjpVLyOUkngw",
    authDomain: "refinder-exchange.firebaseapp.com",
    databaseURL: "https://refinder-exchange.firebaseio.com/",
    projectId: "refinder-exchange",
    storageBucket: "refinder-exchange.appspot.com",
    messagingSenderId: "795224011963",
    appId: "1:795224011963:web:06a200ceb6087f4d32a59e"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.firestore();
const storage = firebase.storage();

export { firebase, auth, database, storage };
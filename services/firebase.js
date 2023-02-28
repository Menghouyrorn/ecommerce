import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCXjQfSYqUe0rGp-pxCw_TgexbZRb-IhWU",
    authDomain: "testprojeact.firebaseapp.com",
    projectId: "testprojeact",
    storageBucket: "testprojeact.appspot.com",
    messagingSenderId: "217892182722",
    appId: "1:217892182722:web:2310cb39b58a68d47cf95b",
    measurementId: "G-NJ34PCF8LP"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const firestore =firebase.firestore();
const fireStorage=firebase.storage();
const fireAuth=firebase.auth();


export{
    firestore,
    fireStorage,
    fireAuth
}


 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
 import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
 import { getDatabase, push, ref as dbRef, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 

 

 // Your uploadFiles function here
var firebaseConfig = {
    apiKey: "AIzaSyA95rq2gZ2o6JfiH-a2tcPMLi97evcW3mE",
    authDomain: "dhub-09.firebaseapp.com",
    databaseURL: "https://dhub-09-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dhub-09",
    storageBucket: "gs://dhub-09.appspot.com",
    messagingSenderId: "486177348563",
    appId:  "1:486177348563:web:ca1216297cddd106ad6d26",
    measurementId: "G-HSJP70KW1N"
};
// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

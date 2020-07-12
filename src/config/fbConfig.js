import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB0JmZqnZdE5QqIvVIYpRB-apgoHENMnJM",
    authDomain: "fir-gameplan-bea55.firebaseapp.com",
    databaseURL: "https://fir-gameplan-bea55.firebaseio.com",
    projectId: "fir-gameplan-bea55",
    storageBucket: "fir-gameplan-bea55.appspot.com",
    messagingSenderId: "552483052874",
    appId: "1:552483052874:web:e3ec851bd4a1c7299a75b3",
    measurementId: "G-RNXR4GMH6Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });
  
  export default firebase 
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBPU3NNsa4YEbWiReZ-eKUNtqQdQqITuNA",
    authDomain: "social-app-23753.firebaseapp.com",
    databaseURL: "https://social-app-23753.firebaseio.com",
    projectId: "social-app-23753",
    storageBucket: "social-app-23753.appspot.com",
    messagingSenderId: "558432265679",
    appId: "1:558432265679:web:66f8ad6cb780d7b2ed5eba",
    measurementId: "G-JD3PSQK6SP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();;
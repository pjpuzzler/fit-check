import firebase from "firebase";

console.log(firebase.firestore.Timestamp.now() === Date.now());

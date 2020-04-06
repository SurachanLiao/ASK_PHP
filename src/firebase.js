import firebase from 'firebase'
import config from './apiKeys'


firebase.initializeApp(config);

//exports the auth module of Firebase + Google auth provider  


export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
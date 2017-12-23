import Rebase from 're-base';
import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCstPYTCdYWr4XvCQNg1J7uD3FWOC7NVe8",
    authDomain: "test-f61fe.firebaseapp.com",
    databaseURL: "https://test-f61fe.firebaseio.com"

}

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
export {app,base, facebookProvider, githubProvider, twitterProvider};
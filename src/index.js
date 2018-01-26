import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-07JO5j9lOet9IpO75M3cMvxKTPmFZy8",
    authDomain: "sample-b6acc.firebaseapp.com",
    databaseURL: "https://sample-b6acc.firebaseio.com",
    projectId: "sample-b6acc",
    storageBucket: "sample-b6acc.appspot.com",
    messagingSenderId: "905933374966"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

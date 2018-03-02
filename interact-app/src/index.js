import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

var config = {
    apiKey: "AIzaSyAgY689SEezlkqbhYGGE7EomU4DAE5Gjbo",
    authDomain: "interactive-app-5ca2d.firebaseapp.com",
    databaseURL: "https://interactive-app-5ca2d.firebaseio.com",
    projectId: "interactive-app-5ca2d",
    storageBucket: "interactive-app-5ca2d.appspot.com",
    messagingSenderId: "285423782464"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
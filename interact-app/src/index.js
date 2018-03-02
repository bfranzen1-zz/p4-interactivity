import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "firebase";
<<<<<<< HEAD
import '../node_modules/bootstrap/dist/css/bootstrap.css';
=======
import 'bootstrap/dist/css/bootstrap.css';
>>>>>>> 15a3972ba76fae89f4a6259d990ac0c7ab2261ff
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
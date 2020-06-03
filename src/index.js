import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

// Firebase
import firebase from "firebase/app";
import fbconfig from "./fbconfig";
// import "firebase/auth";
import "firebase/firestore";

export const fb = firebase.initializeApp(fbconfig);
export const db = fb.firestore();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

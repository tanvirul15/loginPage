import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faCoffee, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
//<i class="fab fa-facebook-square"></i>
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  // firebase.initializeApp(firebaseConfig);

  const handleFacebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    console.log("Facebook");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        console.log(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      });
  };
  const handleGoogleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithRedirect(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      });

    console.log("gmail");
  };
  const handleGithubLogin = () => {
    console.log("github");
  };
  return (
    <div className="App">
      <div className="container py-5">
        <div className="mx-auto w-75 bg-light border-rounded text-center p-5">
          <h1 className="display-4 mb-4">Log In</h1>
          <div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Email/Username" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button className="btn btn-primary">Log In</button>
            <div className="py-3">
              <button className="btn btn-secondary me-3" onClick={handleFacebookLogin}>
                <FontAwesomeIcon icon={faFacebook} /> &nbsp; Facebook
              </button>
              <button className="btn btn-secondary me-3" onClick={handleGoogleLogin}>
                <FontAwesomeIcon icon={faGoogle} />
                &nbsp; Gmail
              </button>
              <button className="btn btn-secondary" onClick={handleGithubLogin}>
                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                &nbsp; Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

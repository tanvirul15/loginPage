import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import { useState } from "react";

//--------------------------------App
function App() {
  const [user, setUser] = useState({});
  //----------------------------------------------
  //--------------------------------------------Variables
  // const [user, setUser] = useState({});
  const { displayName, email, phoneNumber, photoURL } = user;

  //----------------------------------------------Initialization of firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  //----------------------------------------------   Facebook Login Handeler

  const handleFacebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var user = result.user;
      });
  };

  // const logOutFromFacebook = () => {
  //   setUser({});
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       alert("Sign Out Successful");
  //     });
  // };
  // const handleGoogleLogin = () => {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       /** @type {firebase.auth.OAuthCredential} */
  //       var credential = result.credential;
  //       var token = credential.accessToken;
  //       var user = result.user;
  //       setUser(user);
  //     });
  // };

  //------------------------------------------------------Create a profile
  const createProfile = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.updateProfile({
          name,
        });
        document.getElementById("Warning-message").innerText = "Succesfully Created Profile";
        user
          .sendEmailVerification()
          .then(function () {
            console.log("Mail Sent");
          })
          .catch(function (error) {
            console.log(error);
          });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("Warning-message").innerText = errorMessage;
        // ..
      });
  };

  const handleGithubLogin = () => {
    console.log("github");
  };
  const ValidateEmail = (e) => {
    // const warningLabel = document.getElementById("Warning-message");
    // const emailInp = e.target.value;
    // if (e.target.type === "text") {
    //   const reg = /\S+@\S+\.\S+/;
    //   if (!reg.test(e.target.value)) {
    //     warningLabel.innerText = "Enter a valid email";
    //   } else {
    //     warningLabel.innerText = "";
    //   }
    // } else {
    //   let pass = e.target.value;
    //   let reg = /\d+/;
    //   if (pass.length < 8) {
    //     warningLabel.innerText = "Password Should be at least 8 character";
    //   } else if (!reg.test(pass)) {
    //     warningLabel.innerText = "Password Should contain at least 1 digit";
    //   } else if (!/[a-z]+/.test(pass)) {
    //     warningLabel.innerText = "Password Should contain at least 1 small letter";
    //   } else if (!/[A-Z]+/.test(pass)) {
    //     warningLabel.innerText = "Password Should contain at least 1 capital letter";
    //   } else if (/^[a-zA-Z0-9]+/.test(pass)) {
    //     warningLabel.innerText = "Password Should contain at least 1 special character";
    //   } else {
    //     warningLabel.innerText = "";
    //   }
    // }
  };

  return (
    <div className="App">
      <div className="container py-5">
        <div className="mx-auto w-75 bg-light border-rounded text-center p-5">
          {!displayName && (
            <div>
              <h1 className="display-4 mb-4">Log In</h1>
              <label id="Warning-message" className="label p-2 m-2 text-danger"></label>
              <div className="mb-3">
                <input type="text" id="name" className="form-control" placeholder="Name" onBlur={ValidateEmail} />
              </div>
              <div className="mb-3">
                <input type="text" id="email" className="form-control" placeholder="Email/Username" onBlur={ValidateEmail} />
              </div>
              <div className="mb-3">
                <input type="password" id="password" className="form-control" placeholder="Password" onBlur={ValidateEmail} />
              </div>
              <button className="btn btn-primary" onClick={createProfile}>
                Log In
              </button>
              <div className="py-3">
                <button className="btn btn-secondary me-3" onClick={handleFacebookLogin}>
                  <FontAwesomeIcon icon={faFacebook} /> &nbsp; Facebook
                </button>
                <button className="btn btn-secondary me-3">
                  <FontAwesomeIcon icon={faGoogle} />
                  &nbsp; Gmail
                </button>
                <button className="btn btn-secondary" onClick={handleGithubLogin}>
                  <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                  &nbsp; Github
                </button>
              </div>
            </div>
          )}
          {displayName && (
            <div>
              <h5 className="display-6">{displayName}</h5>
              <img src={photoURL} alt="Profile" className="img-fluid d-inline-block" />
              <h5>Email: {email}</h5>
              <h5>Phone No: {phoneNumber}</h5>
              <button className="btn btn-danger">Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

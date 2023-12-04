// import React from "react";
import { useReducer } from "react";
import { INITIAL_STATE, signUpReducer } from "./signUpReducer";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase.js";
import SignUpGoogle from "./SignUpGoogle.jsx";
import { Form } from "react-router-dom";
// import AuthDetails from "./AuthDetails.jsx";

// Import necessary dependencies and components...

function SignUp() {
    const [state, dispatch] = useReducer(signUpReducer, INITIAL_STATE);

    async function signUp(event) {
        event.preventDefault();
        if (state.tempPasswd !== state.conPasswd) {
            alert("Passwords do not match! \nEnter again");
            return;
        } else {
            createUserWithEmailAndPassword(auth, state.email, state.conPasswd)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    await sendEmailVerification(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }
        return;
    }

    return (
        <div className="bg-gradient">
            <div className="content">
                <form method="post" action="/home">
                    <header> Sign Up </header>
                    <div className="field">
                        <input
                            type="email"
                            placeholder="Email or phone number"
                            value={state.email}
                            onChange={(e) => { dispatch({ type: "emailChange", payload: e.target.value }) }} />
                    </div><p></p>
                    <div className="field">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={state.tempPasswd}
                            onChange={(e) => { dispatch({ type: "tempPasswdChange", payload: e.target.value }) }} />
                    </div><p></p>
                    <div className="field">
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={state.conPasswd}
                            onChange={(e) => { dispatch({ type: "conPasswdChange", payload: e.target.value }) }} />
                    </div><p></p>
                    <button type="submit" onClick={signUp}>Join</button>
                </form>
                <h5>OR</h5>
                <SignUpGoogle />
                <h3>Already on ReLink? <a href="#">Sign In</a></h3>

            </div>
        </div>
    );
}

export default SignUp;

// import React from "react";
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import SignUpGoogle from "./SignUpGoogle";

function LogIn(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    function logIn(event){
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, passwd)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        return
    }

    return (
        <div className= "bg-gradient">
            <div className="contents">
            <form method="post" action="/home">
                <header>SignIn</header>
                <div className="field">
                <input 
                    type="email" 
                    placeholder="Email or phone number"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                    </div><p></p>
                <div className="field">
                <input 
                    type="password"
                    placeholder="Enter password"
                    value={passwd}
                    onChange={(event) => setPasswd(event.target.value)} />

                </div><p></p>

                <div className= "pass">
                <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" onClick={logIn}>SignIn</button>
            </form>
            <h5>OR</h5>
            <SignUpGoogle />
            <h3>New to ReLink? <a href="#">Join Now</a></h3>
            </div>
        </div>
    )
}

export default LogIn;
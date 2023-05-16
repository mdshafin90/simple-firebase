import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase.config';
import './Login.css'

const auth = getAuth(app)

const Login = () => {
    const [user, setUser] = useState()

    const googleProvider = new GoogleAuthProvider()
    const gitHubProvider = new GithubAuthProvider()

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGitHubLogIn = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                setUser(loggedUser)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div>
            <h1>Please Login</h1>
            <div>
                {user ?
                    <button className='log-out-btn' onClick={handleGoogleSignOut}>Logout</button> :
                    <div>
                        <button className='log-in-btn' onClick={handleGoogleSignIn}>Google Login</button>
                        <button className='log-in-btn' onClick={handleGitHubLogIn}>GitHub Login</button>
                    </div>
                }
                {
                    user && <div>
                        <h2>User: {user.displayName}</h2>
                        <h4>Email: {user.email}</h4>
                        <img src={user.photoURL} alt="" />
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;
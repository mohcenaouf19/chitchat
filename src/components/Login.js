import React from 'react';
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app"
import { auth } from "../firebase.js";

import firebase from 'firebase';

const Login = () => {
    return (
        <div id='login-page'>
            <div id='login-card'>
                <h1> welcome to unichat </h1>


                <div 
                className='login-button google'
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> sign in with google
                </div><br /><br />



                <div 
                className='login-button facebook'
                onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}

                >
                    <FacebookOutlined /> sign in with facebook
                </div>



            </div>
        </div>
    );
}

export default Login;
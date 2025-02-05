import './ForgotPassword.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Login from '../LoginView/Login.js';

// Login > Click Forgot Password
function ForgotPassword(props) {

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //validate email
    const validateEmail = () => {
        let isValidEntries = true;
        if(document.getElementById("email").value === "" ||
        ! email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )) {
            document.getElementById("emailError").innerHTML = "Please enter a valid email address";
            isValidEntries = false;
        } else {
            document.getElementById("emailError").innerHTML = "";
        }
        return isValidEntries;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateEmail()) {
            axios.post('http://127.0.0.1:8000/login/forgot-password/', // api call email - forgot password link
                {email})
            .then(response => {
                navigate('/');
            }).catch( error => {
                navigate('/'); // navigate to login page irrespective of finding the email to prevent pottential attack
            })

        }
    }

    return(
        <div className="forgotPassword">

            <h2 id='fp_Id'>Forgot Password?</h2>
           <p id='fp_Para'>Please enter the email address associated with your account to receive a password reset link.</p>
            <br/>

           <form className='fp_Container' onSubmit={handleSubmit}>

                <div className='fp_formContainer'>
                {errorMessage ? <label className='fp_errorDiv'> {errorMessage} </label> : null}
                    <div>
                        <label className='fp_inputLabel'> Email
                            <span className='fp_asterick'> * </span>
                            <span className="fp_errorDiv" id="emailError"></span>
                        </label>
                        <br/>
                        <input className='fp_inputArea' type="email" value={email} id = 'email' required
                               onChange={(event)=> {
                                    setEmail(event.target.value);
                                    setErrorMessage('');
                                }}/>
                    </div>

                    <div className='fp_submitDiv'>
                        <button type="submit" className="fp_sendButton"
                            onClick={handleSubmit}> SEND </button>
                    </div>

                    <div className='fp_backToLoginDiv'>
                        Back to
                        <Link to='/' className='fp_backToLoginLink , fp_buttonLink'> Log in </Link>
                    </div>

                </div>

            </form>

        </div>
   
    );
}
export default ForgotPassword;
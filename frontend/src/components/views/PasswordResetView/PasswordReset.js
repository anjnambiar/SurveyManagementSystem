import './PasswordReset.css';
import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Login > Forgot Passowrd > Email > Password Reset
function PasswordReset(props) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [resetHeaderMessage, setresetHeaderMessage] = useState('Please reset your password');
    const [showForm, setShowForm] = useState(true); //to hide form after password reset and show login link
    const {token} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("TOKEN ...." + token);
        if(validateForm()) {
            axios.post(`http://127.0.0.1:8000/login/password-reset/${token}`,
                {password, token}
            ).then( request => {
                setresetHeaderMessage('Password has been reset successfully.');
                setPassword('');
                setConfirmPassword('');
                setShowForm(false);
            }).catch ( error => {

            })
            
        }
    }


     //validate all inputs
     const validateForm = () => {
        let isValidEntries = true;
        if(document.getElementById("password").value === "") {
            document.getElementById("passwordError").innerHTML = "Please enter a password";
            isValidEntries = false;
        } else {
            document.getElementById("passwordError").innerHTML = "";
        }

        if(document.getElementById("confirmPassword").value === "" ) {
            document.getElementById("confirmPasswordError").innerHTML = "Please enter a password";
            isValidEntries = false;
        } else {
            document.getElementById("confirmPasswordError").innerHTML = "";
        }

        if(password !== confirmPassword //check if confirm password matching
          && document.getElementById("password").value !== ""
          && document.getElementById("confirmPassword").value !== "") {
            setPasswordError('Passwords does not match');
            isValidEntries = false;
        } else {
            setPasswordError('');
        }
        return isValidEntries;
    }


    return(
        <div className="passwordReset">

            <h2 id='pr_Id'>{resetHeaderMessage}</h2>
            <br/>

            {showForm && ( <form className='pr_Container' onSubmit={handleSubmit}>

                <div className='pr_formContainer'>

                    <div>
                        <label className='pr_inputLabel'> Password
                            <span className='pr_asterick'> * </span>
                            <span className="pr_errorDiv" id="passwordError"></span>
                        </label>
                        <br/>
                        <input className='pr_inputArea' type="password" value={password} required
                               id='password' onChange={(event)=>setPassword(event.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <label className='pr_inputLabel'> Confirm Password
                            <span className='pr_asterick'> * </span>
                            <span className="pr_errorDiv" id="confirmPasswordError"></span>
                            <span>{ passwordError ? <label className="pr_errorDiv" > {passwordError} </label> : null }</span>
                        </label>
                        <br/>
                        <input className='pr_inputArea' type="password" value={confirmPassword} required
                               id='confirmPassword' onChange={(event)=>setConfirmPassword(event.target.value)}/>
                    </div>

                    <div className='pr_submitDiv'>
                        <button type="submit" className="pr_sendButton"
                            onClick={handleSubmit}> RESET </button>
                    </div>

                </div>

            </form>
            )}

        {!showForm && ( //this is shown only after successful password reset
            <div className='pr_linkDiv'> <Link to="/" className='pr_buttonLink'>
                Click here to login</Link> </div>
        )}

        </div>
    );
}
export default PasswordReset;
import './SignUp.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Login > Sign Up
function SignUp(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm()) {
            axios.post('http://127.0.0.1:8000/login/register/' , //api call for new user register
                {name, email, contactNum, password})
                .then(response => {
                    setRegisterMessage('USER REGISTERED SUCCESSFULLY ! REDIRECTING TO LOGIN PAGE ...');
                    setName('');
                    setEmail('');
                    setContactNum('');
                    setPassword('');
                    setConfirmPassword('');
                    navigate('/');
                }).catch(error => {
                    setRegisterMessage('User registration failed');
                })
        }
    };

    //validate email
    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

     //validate all inputs
    const validateForm = () => {
        let isValidEntries = true;
        if(document.getElementById("name").value === "") {
            document.getElementById("nameError").innerHTML = "Please enter a name";
            isValidEntries = false;
        } else {
            document.getElementById("nameError").innerHTML = "";
        }
        if(document.getElementById("email").value === "" || ! validateEmail(email)) {
            document.getElementById("emailError").innerHTML = "Please enter a valid email address";
            isValidEntries = false;
        } else {
            document.getElementById("emailError").innerHTML = "";
        }
        if(document.getElementById("contactNum").value === "") {
            document.getElementById("contactNumError").innerHTML = "Please enter a contact number";
            isValidEntries = false;
        } else {
            document.getElementById("contactNumError").innerHTML = "";
        }
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
        <div className='signUp'>

            <h2 id='signUpId'>Sign-Up</h2>

             <form className='signUpContainer' onSubmit={handleSubmit}>

                <div className='signup_formContainer'>
                    {registerMessage ? <label className='signUp_errorDiv'> {registerMessage} </label> : null}
                    <div>
                        <label className='signup_inputLabel' htmlFor='name'> Name
                            <span className='signup_asterick'> * </span>
                            <span className="signUp_errorDiv" id="nameError"></span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='name' id='name'
                               value={name} minLength={2} maxLength={50}
                               onChange = {(event) => {setName(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='email'> Email
                            <span className='signup_asterick'> * </span>
                            <span className="signUp_errorDiv" id="emailError"></span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='email' id='email'
                               value={email} onChange = {(event) => {setEmail(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='contactNum'> Contact Number
                            <span className='signup_asterick'> * </span>
                            <span className="signUp_errorDiv" id="contactNumError"></span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='number' id='contactNum'
                               value={contactNum} min={10} maxLength={15} 
                               onChange = {(event) => {setContactNum(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='password'> Password
                            <span className='signup_asterick'> * </span>
                            <span className="signUp_errorDiv" id="passwordError"></span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='password' id='password'
                               value={password} minLength={8}
                               onChange = {(event) => {setPassword(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='confirmPassword'> Confirm Password
                            <span className='signup_asterick'> * </span>
                            <span className="signUp_errorDiv" id="confirmPasswordError"></span>
                            <span>{ passwordError ? <label className="signUp_errorDiv" > {passwordError} </label> : null }</span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='password'
                                id='confirmPassword' value={confirmPassword}
                                onChange = {(event) => {setConfirmPassword(event.target.value)}}/>
                    </div>

                    <div className='signup_submitDiv'>
                        <button type='submit' className='signup_submitButton'
                            onClick={handleSubmit}> SIGN UP </button>
                    </div>

                </div>

            </form>

        </div>
    );
}
export default SignUp;
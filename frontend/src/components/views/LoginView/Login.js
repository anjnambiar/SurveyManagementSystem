import './Login.css';
import { useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

// Login > Admin or User
function Login(props) {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [authErrorMessage, setAuthErrorMessage] = useState('');
   const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm()) {
            axios.post('http://127.0.0.1:8000/login/authenticate/' , //api call for user authentication
            {email, password})
            .then(response => {
                localStorage.setItem("username", response.data.name);
                localStorage.setItem("user_id", response.data.id);
                if (response.data.is_staff) {
                    localStorage.setItem("is_staff", "admin");
                    return navigate('/survey/adminForms', {replace:true});
                }
                else
                    return navigate('/survey/userForms', {replace:true});
            }).catch(error => {
                setAuthErrorMessage('Invalid username or password');
            })
        } else {
            setAuthErrorMessage('');
        }
    };

    //print error message
    const printError = (errorLoc, errorMsg) => {
        document.getElementById(errorLoc).innerHTML = errorMsg;
     }

     //validate email
     const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

     //validate all inputs
    const validateForm = () => {
        let isValidEntries = true;
        if(document.getElementById("email").value === "" || ! validateEmail(email)) {
            printError("emailError", "Please enter a valid email address");
            isValidEntries = false;
        } else {
            printError("emailError", "");
        }
        if(document.getElementById("password").value === "") {
            printError("passwordError", "Please enter a password");
            isValidEntries = false;
        } else {
            printError("passwordError", "");
        }
        return isValidEntries;
    }

    return(
        <div className='login'>

            <h2 id='siginId'>Sign-in</h2>

             <form className='loginContainer' onSubmit={handleSubmit}>

                <div className='login_formContainer'>
                {authErrorMessage ? <label className="login_errorDiv"> {authErrorMessage} </label> : null}
                    <div>
                        <label className='login_inputLabel' htmlFor='email'> Email
                            <span className='login_asterick'> * </span>
                            <span className="login_errorDiv" id="emailError"></span>
                        </label>
                        <input required className='login_inputArea' type='email' id='email'
                                value={email} onChange={(event)=>setEmail(event.target.value)}/>
                    </div>

                    <div>
                        <label className='login_inputLabel' htmlFor='password'> Password
                            <span className='login_asterick'> * </span>
                            <span className="login_errorDiv" id="passwordError"></span>
                        </label>
                        <input required className='login_inputArea' type="password" id='password'
                                value={password} onChange={(event)=>setPassword(event.target.value)}/>
                    </div>

                    <div className='login_forgotPwdDiv'>
                        <Link to="/forgot-password" className='login_forgotpwd , login_buttonLink'> Forgot Password ? </Link>
                    </div>

                    <div className='login_submitDiv'>
                        <button type="submit" className="login_submitButton"
                                onClick={handleSubmit}> LOG IN </button>
                    </div>

                    <div className='login_labelAndSignUpDiv'>
                        <label>Don't have an account?</label>
                        <Link to="/signup" className='login_signUp , login_buttonLink'> Sign up </Link>
                    </div>

                    <div className='login_divider'><span>OR</span></div>

                    <div className='login_anonymousDiv'>
                        <label>If you dont want to sign up </label> <span>
                        <Link to="/anonymous" className='login_anonymousLink , login_buttonLink'>
                        Continue as Anonymous </Link></span>

                    </div>

                </div>

            </form>

        </div>
    );
}
export default Login;
import './Login.css';
import { useState , useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function Login(props) {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

//    useEffect(()=> {
//     localStorage.setItem("username",JSON.stringify(email));
//    },[email]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm()) {
            axios.post('https://jsonplaceholder.typicode.com/posts', {email})
            .then(response => {
                console.log(response)
            })
            .catch("Login failed")
         }
    }

    //print error message
    const printError = (errorLoc, errorMsg) => {
        document.getElementById(errorLoc).innerHTML = errorMsg;
     }

     //validate all inputs
    const validateForm = () => {
        let isValidEntries = true;

        if(document.getElementById("email").value === "") {
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

                    <div>
                        <label className='login_inputLabel' htmlFor='email'> Email
                            <span className='login_asterick'> * </span>
                        </label>
                        <div className="login_errorDiv" id="emailError"></div>
                        <input required className='login_inputArea' type='email' id='email'
                                value={email} onChange={(event)=>setEmail(event.target.value)}/>
                    </div>

                    <div>
                        <label className='login_inputLabel' htmlFor='password'> Password
                            <span className='login_asterick'> * </span>
                        </label>
                        <div className="login_errorDiv" id="passwordError"></div>
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
import './ForgotPassword.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function ForgotPassword(props) {

    const [email, setEmail] = useState('');

    //will write code later
    const handleSubmit = (event) => {

    }

    return(
        <div className="forgotPassword" onSubmit={handleSubmit}>

            <h2 id='fp_Id'>Forgot Password?</h2>
            <p id='fp_Para'>Enter the email address associated with your account.</p>
            <br/>

            <form className='fp_Container'>

                <div className='formContainer'>

                    <div>
                        <label className='fp_inputLabel'> Email
                            <span className='fp_asterick'> * </span>
                        </label>
                        <br/>
                        <input className='fp_inputArea' type="email" value={email} required
                               onChange={(event)=>setEmail(event.target.value)}/>
                    </div>

                    <div className='fp_submitDiv'>
                        <button type="submit" className="fp_sendButton"> SEND </button>
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
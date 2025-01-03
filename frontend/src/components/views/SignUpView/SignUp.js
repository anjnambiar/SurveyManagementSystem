import './SignUp.css';
import { useState } from 'react';

function SignUp(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        if(password !== confirmPassword) {
            alert("Password not matching !");
        }
    }

    return(
        <div className='signUp'>

            <h2 id='signUpId'>Sign-Up</h2>

             <form className='signUpContainer' onSubmit={handleSubmit}>

                <div className='signup_formContainer'>

                    <div>
                        <label className='signup_inputLabel' htmlFor='name'> Name
                            <span className='signup_asterick'> * </span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='name' value={name}
                               minLength={2} maxLength={50}
                               onChange = {(event) => {setName(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='email'> Email
                            <span className='signup_asterick'> * </span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='email' value={email}
                                onChange = {(event) => {setEmail(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='contactNumber'> Contact Number
                            <span className='signup_asterick'> * </span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='number' value={contactNumber}
                               min={10} maxLength={15}
                               onChange = {(event) => {setContactNumber(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='password'> Password
                            <span className='signup_asterick'> * </span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='password' value={password}
                                minLength={8}
                                onChange = {(event) => {setPassword(event.target.value)}}/>
                    </div>

                    <div>
                        <label className='signup_inputLabel' htmlFor='confirmPassword'> Confirm Password
                            <span className='signup_asterick'> * </span>
                        </label>
                        <br/>
                        <input required className='signup_inputArea' type='password' value={confirmPassword}
                                onChange = {(event) => {setConfirmPassword(event.target.value)}}/>
                    </div>

                    <div className='signup_submitDiv'>
                        <button type="submit" className='signup_submitButton'> SIGN UP </button>
                    </div>

                </div>

            </form>

        </div>
    );
}
export default SignUp;
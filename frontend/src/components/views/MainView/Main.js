import './Main.css';
import InitialImage from '../../../images/InitialImage.jpg';
import ForgotPassword from '../ForgotPasswordView/ForgotPassword.js';
import PasswordReset from '../PasswordReset/PasswordReset.js';
import SignUp from '../SignUpView/SignUp.js';
import Login from '../LoginView/Login.js';
import {Route, Routes} from 'react-router-dom';


function Main() {

    return(
        <div className="main">

            <div className="mainLeftPanel">
                <img className="initialImage" src={InitialImage} alt="InitalLoad"/>
            </div>

            <div className="mainRightPanel">
                <div className="formContainer">

                <Routes>
                    <Route className="segment" path="/" element={<Login/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/signup" element={<SignUp/>}></Route>
                </Routes>
                <Routes>
                    <Route path="/password-reset" element={<PasswordReset/>}></Route>
                </Routes>

                </div>
            </div>

        </div>
    );
}
export default Main;
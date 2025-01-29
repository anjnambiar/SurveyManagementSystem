import './Main.css';
import InitialImage from '../../../images/InitialImage.jpg';
import ForgotPassword from '../ForgotPasswordView/ForgotPassword.js';
import PasswordReset from '../PasswordResetView/PasswordReset.js';
import SignUp from '../SignUpView/SignUp.js';
import Login from '../LoginView/Login.js';
import {Outlet, Route, Routes } from 'react-router-dom';


function Main() {

    return(
        <div>
            <div id = "mainId" className="main">

                <div className="mainLeftPanel">
                    <img className="initialImage" src={InitialImage} alt="InitalLoad"/>
                </div>

                <div className="mainRightPanel">
                    <div className="formContainer">
                        <Outlet/>
                    {/* <Routes>
                        <Route path="/" element={<Login/>}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/signup" element={<SignUp/>}></Route>
                    </Routes>
                    <Routes>
                        <Route path="/password-reset/:token" element={<PasswordReset/>}></Route>
                    </Routes> */}
                    </div>
                </div>

            </div>

        </div>
    );
}
export default Main;
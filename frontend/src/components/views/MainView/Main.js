import './Main.css';
import React from 'react';
import InitialImage from '../../../images/InitialImage.jpg';
import {Outlet} from 'react-router-dom';

// Main component holding Login , Forgot Password, SignUp
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
                    </div>
                </div>

            </div>

        </div>
    );
}
export default Main;
import AdminForms from '../AdminFormsView/AdminForms';
import User from '../UserView/User.js';
import Profile from '../ProfileView/Profile.js';
import './SurveyMain.css';
import {Link, Outlet, Route, Routes, useNavigate} from 'react-router-dom';
import FormIcon from '../../../images/FormIcon.png';
import ProfileIcon from '../../../images/ProfileIcon.png';
import UserIcon from '../../../images/UserIcon.png';
import LogoutIcon from '../../../images/LogoutIcon.png';
import AddForm from '../AddFormView/AddForm.js';
import { useEffect, useState } from 'react';


function SurveyMain() {

    const userName = localStorage.getItem('username') ;

    const [headerName, setHeaderName] = useState('Forms');

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('username');
        return navigate('/');
    }

    useEffect(() => {
        if (!userName) {
            navigate('/');
        }
    },[]);

    return (
        <div className = "surveyParentForm">
            { userName ? (
            <><div className="leftPanel">

                    <div className='logoDiv'>
                        <h3 id='logo'>LOGO</h3>
                    </div>

                    <div className='formLinkDiv leftLinkDiv'>
                        <img className='survey_icons' src={FormIcon} alt='formIcon' />
                        <Link to='survey/adminForms' className='surveyMainLink'
                            onClick={()=>{setHeaderName('Forms')}}>Forms</Link>
                    </div>

                    <div className='profileLinkDiv leftLinkDiv'>
                        <img className='survey_icons' src={ProfileIcon} alt='profileIcon' />
                        <Link to='survey/profile' className='surveyMainLink'
                            onClick={()=>{setHeaderName('Profile')}}>Profile</Link>
                    </div>

                    <div className='userLinkDiv leftLinkDiv'>
                        <img className='survey_icons' src={UserIcon} alt='userIcon' />
                        <Link to='survey/user' className='surveyMainLink'
                            onClick={()=>{setHeaderName('User')}}>User</Link>
                    </div>

                    <div className='logoutDiv leftLinkDiv'>
                        <img className='survey_icons' src={LogoutIcon} alt='logoutIcon' />
                        <Link to='/' className='surveyMainLink' onClick={handleLogout}>Logout</Link>
                    </div>

                </div><div className="rightPanel">

                        <div className="surveyHeaderSection">
                            <span className="headerLeft">{headerName}</span>
                            <span className="headerRight">{userName}</span>
                        </div>

                        <Outlet />

                    </div></>
            ): navigate('/') }
        </div>

       
  
    );

}

export default SurveyMain;
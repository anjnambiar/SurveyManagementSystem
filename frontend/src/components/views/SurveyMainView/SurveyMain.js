import './SurveyMain.css';
import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import FormIcon from '../../../images/FormIcon.png';
import ProfileIcon from '../../../images/ProfileIcon.png';
import UserIcon from '../../../images/UserIcon.png';
import LogoutIcon from '../../../images/LogoutIcon.png';
import { useEffect, useState } from 'react';

// Login > Main Component to render all details after login
function SurveyMain() {

    const userName = localStorage.getItem('username') ;
    const is_staff = localStorage.getItem("is_staff") ;
    const userId = localStorage.getItem('user_id');

    const [headerName, setHeaderName] = useState('Forms');

    let link ;
    if(is_staff) {
        link = <Link to='survey/adminForms' className='surveyMainLink'
                    onClick={()=>{setHeaderName('Forms')}}>Forms</Link>
    } else {
        link = <Link to='survey/userForms' className='surveyMainLink'
                    onClick={()=>{setHeaderName('Forms')}}>Forms</Link>
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
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
                        { link }
                    </div>

                    <div className='profileLinkDiv leftLinkDiv'>
                        <img className='survey_icons' src={ProfileIcon} alt='profileIcon'/>
                        <Link to={`survey/profile/${userId}`} className='surveyMainLink'
                            onClick={()=>{setHeaderName('Profile')}}>Profile</Link>
                    </div>
                    {is_staff ? (
                    <div className='userLinkDiv leftLinkDiv'>
                        <img className='survey_icons' src={UserIcon} alt='userIcon' />
                        <Link to='survey/user' className='surveyMainLink'
                            onClick={()=>{setHeaderName('User')}}>User</Link>
                    </div> ): null }

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
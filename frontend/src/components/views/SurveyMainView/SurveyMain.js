import AdminForms from '../AdminFormsView/AdminForms';
import Logout from '../LogoutView/Logout.js';
import User from '../UserView/User.js';
import Profile from '../ProfileView/Profile.js';
import './SurveyMain.css';
import {Link, Route, Routes} from 'react-router-dom';
import FormIcon from '../../../images/FormIcon.png';
import ProfileIcon from '../../../images/ProfileIcon.png';
import UserIcon from '../../../images/UserIcon.png';
import LogoutIcon from '../../../images/LogoutIcon.png';


function SurveyMain() {

    return (

        <div className = "surveyParentForm">

            <div className = "leftPanel">
                <div className='logoDiv'>
                    <h3>LOGO</h3>
                </div>
                <div className='formLinkDiv leftLinkDiv'>
                    <img className='survey_icons' src={FormIcon} alt='formIcon'/>
                    <Link to='/survey/adminForms' className='surveyMainLink'>Forms</Link>
                </div>
                <div className='profileLinkDiv leftLinkDiv'>
                    <img className='survey_icons' src={ProfileIcon} alt='profileIcon'/>
                    <Link to='/survey/profile' className='surveyMainLink'>Profile</Link>
                </div>
                <div className='userLinkDiv leftLinkDiv'>
                    <img className='survey_icons' src={UserIcon} alt='userIcon'/>
                    <Link to='/survey/user' className='surveyMainLink'>User</Link>
                </div>
                <div className='logoutDiv leftLinkDiv'>
                    <img className='survey_icons' src={LogoutIcon} alt='logoutIcon'/>
                    <Link to='/' className='surveyMainLink'>Logout</Link>
                </div>
            </div>

            <div className = "rightPanel">
                <Routes>
                    <Route path="/survey/adminForms" element={<AdminForms/>}></Route>
                    <Route path="/survey/profile" element={<Profile/>}></Route>
                    <Route path="/survey/user" element={<User/>}></Route>
                </Routes>
            </div>

        </div>
    );
}

export default SurveyMain;
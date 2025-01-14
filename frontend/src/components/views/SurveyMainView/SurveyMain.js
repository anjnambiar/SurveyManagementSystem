import AdminForms from '../AdminFormsView/AdminForms';
import User from '../UserView/User.js';
import Profile from '../ProfileView/Profile.js';
import './SurveyMain.css';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import FormIcon from '../../../images/FormIcon.png';
import ProfileIcon from '../../../images/ProfileIcon.png';
import UserIcon from '../../../images/UserIcon.png';
import LogoutIcon from '../../../images/LogoutIcon.png';
import AddForm from '../AddFormView/AddForm.js';


function SurveyMain() {

    const userName = localStorage.getItem('username') || "Dummy User";

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('username');
        return navigate('/');
    }


    return (

        <div className = "surveyParentForm">

            <div className = "leftPanel">

                <div className='logoDiv'>
                    <h3 id='logo'>LOGO</h3>
                </div>

                <div className='formLinkDiv leftLinkDiv'>
                    <img className='survey_icons' src={FormIcon} alt='formIcon'/>
                    <Link to='adminForms' className='surveyMainLink'>Forms</Link>
                </div>

                <div className='profileLinkDiv leftLinkDiv'>
                    <img className='survey_icons' src={ProfileIcon} alt='profileIcon'/>
                    <Link to='profile' className='surveyMainLink'>Profile</Link>
                </div>

                <div className='userLinkDiv leftLinkDiv'>
                    <img className='survey_icons' src={UserIcon} alt='userIcon'/>
                    <Link to='user' className='surveyMainLink'>User</Link>
                </div>

                <div className='logoutDiv leftLinkDiv'>
                    <img className='survey_icons' src={LogoutIcon} alt='logoutIcon'/>
                    <Link to='/' className='surveyMainLink' onClick={handleLogout}>Logout</Link>
                </div>

            </div>

            <div className = "rightPanel">

                <div className="surveyHeaderSection">
                    <span className="headerLeft">Forms</span>
                    <span className="headerRight">{userName}</span>
                </div>

                <Routes>
                    <Route path="adminForms" element={<AdminForms/>}></Route>
                    <Route path="profile" element={<Profile/>}></Route>
                    <Route path="user" element={<User/>}></Route>
                    <Route path="addForms" element={<AddForm/>}></Route>
                    <Route path="*" element={<h1>Not found</h1>}></Route>
                </Routes>
            </div>

        </div>
  
    );

}

export default SurveyMain;
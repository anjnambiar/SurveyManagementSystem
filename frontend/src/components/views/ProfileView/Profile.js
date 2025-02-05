import './Profile.css';
import React, { useState , useEffect} from 'react';
import ProfileImage from '../../../images/ProfileImage.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData , updateUserData} from '../../../redux/userSlice.js';
import { useParams, useNavigate } from 'react-router-dom';
import BannerBadge from '../../../images/BannerBadge.png';
import PwdKeyImage from '../../../images/PwdKeyImage.png';

// User or Admin > Profile
function Profile() {

    const {userId} = useParams();
    const dispatch = useDispatch();
    const {data} = useSelector((state) => state.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [reward_points, setRewardPoints] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Dispatch the async action to fetch the user data when the component mounts
        if(!data && userId)
            dispatch(fetchUserData(userId));
    }, [dispatch, userId, data]);

    useEffect(() => { //if data is changed set states
        if(data) {
            setName(data.name);
            setEmail(data.email);
            setContactNum(data.contactNum);
            setRewardPoints(data.reward_points);
        }
    }, [data]);

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        const updatedUserData = {'userId':userId, 'name':name, 'email':email, 'contactNum':contactNum};
        dispatch(updateUserData(updatedUserData)); // dispatch the updated values to store
    }

    const handleCancelClick = () => {
        if(localStorage.getItem("is_staff")) 
            navigate('/survey/adminForms');
        else
            navigate('/survey/userForms');
    }

    const handleImageClick = () => {}


    return(
        <div className='profile'>
            <form className='profile-form' onSubmit={handleUpdateProfile}>
                <div className='profile-div'>

                {! localStorage.getItem('is_staff') &&
                <div className='banner-div'>
                    <img id='profile-banner-badge' src={BannerBadge} alt='banner-badge'/>
                    <label id='profile-banner-label'>You have earned a total</label> <br/>
                    <label id='profile-banner-points'>{reward_points} Points</label>
                </div> }

                <div className='left-profile-div'>
                    <div className='profile-img-div'>
                        <button type='button' id='profile-camera-btn' onClick={handleImageClick}></button>
                        <img src={ProfileImage} alt='formIcon'/>
                    </div>
                    <div className='profile-pwd-btn-div'>
                        <button id='change-pwd-btn' type='button'>
                            <img id='pwd-key-img' src={PwdKeyImage} alt='password-image'/>
                        Change Password</button>
                    </div>
                </div>

                <div className='right-profile-div'>
                    <div className='name-div'>
                        <label className='profile-label' htmlFor='name'>Name</label>
                        <input className='profile-input' id='name' type='text' required
                            value={name} onChange={(event)=>setName(event.target.value)}
                            />
                    </div>

                    <div className='email-div'>
                        <label className='profile-label' htmlFor='email'>Email Address</label>
                        <input className='profile-input' id='email' type='email' required
                        value={email} onChange={(event)=>setEmail(event.target.value)}
                        />
                    </div>

                    <div className='contactNum-div'>
                        <label className='profile-label' htmlFor='contactNum'>Contact Number</label>
                        <input className='profile-input' id='contactNum' type='number' required
                            value={contactNum} onChange={(event)=>setContactNum(event.target.value)}
                            />
                    </div>

                    <div className='btn-div'>
                        <button id='update-prof-btn' type='submit'>Update Profile</button>
                        <button id='cancel-btn' type='button' onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    );
}

export default Profile;
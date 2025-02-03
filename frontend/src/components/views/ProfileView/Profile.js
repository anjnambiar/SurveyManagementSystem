import './Profile.css';
import ProfileImage from '../../../images/ProfileImage.jpg';

// User or Admin > Profile
function Profile() {

    const handleUpdateProfile = (event) => {
        event.preventDefault();
    }


    return(
        <div className='profile'>
            <form className='profile-form' onSubmit={handleUpdateProfile}>
                <div className='profile-div'>

                <div className='left-profile-div'>
                    <div className='profile-img-div'>
                        <img src={ProfileImage} alt='formIcon'/>
                    </div>
                    <div className='profile-pwd-btn-div'>
                        <button id='change-pwd-btn' type='button'>Change Password</button>
                    </div>
                </div>

                <div className='right-profile-div'>
                    <div className='name-div'>
                        <label className='profile-label' htmlFor='name'>Name</label>
                        <input className='profile-input' id='name' type='text' required/>
                    </div>

                    <div className='email-div'>
                        <label className='profile-label' htmlFor='email'>Email Address</label>
                        <input className='profile-input' id='email' type='email' required/>
                    </div>

                    <div className='contactNum-div'>
                        <label className='profile-label' htmlFor='contactNum'>Contact Number</label>
                        <input className='profile-input' id='contactNum' type='number' required/>
                    </div>

                    <div className='btn-div'>
                        <button id='update-prof-btn' type='submit'>Update Profile</button>
                        <button id='cancel-btn' type='button'>Cancel</button>
                    </div>
                </div>

            </div>
            </form>
        </div>
    );
}

export default Profile;
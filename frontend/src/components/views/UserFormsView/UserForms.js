import './UserForms.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserForms = () => {

    const navigate = useNavigate();

    const handleParticipateClick = () => {
        navigate('/survey/surveyForm/1');
    }


    return (
    <div className='userForms'>
        <div className='uForm-div'>
            <div className='uForm-bar-div'>
                <div className="custom-select-div">
                    <select className="custom-select">
                        <option value="All">All</option>
                    </select>
                </div>
                <div className='searchInputDiv'>
                    <input className='searchInput' type="text" placeholder="Search &#x1F50D;"
                        />
                </div>
                <div className='view-participated-btn'>
                    <button type='button'>View Participated Forms</button>
                </div>
            </div>
        </div>
        
        <div className='survey-card-div'>
            <div className='survey-card'> {/*dynamically populated*/}
                <label>survey points</label>
                <label>SURVEY TITLE</label>
                <label>Survey description</label>
                <button type='button' onClick={handleParticipateClick}>Participate</button>
            </div>
        </div>
        
    </div>
    )
}

export default UserForms
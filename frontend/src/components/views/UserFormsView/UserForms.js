import './UserForms.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PointsImg from '../../../images/PointsImg.png';

const UserForms = () => {

    const navigate = useNavigate();
    const [allSurvey, setAllSurvey] = useState({results:[]});
    const [participatedSurveys, setParticipatedSurveys] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/survey/addSurvey/')
        .then(response => {
            setAllSurvey(response.data)
        })
        .catch(error => console.log(error))
    }, []);


    useEffect(() => {
       const user_id = localStorage.getItem('user_id');
       if(user_id) {
            allSurvey.results.forEach(survey => {
                axios.get(`http://127.0.0.1:8000/survey/surveyResponse/${survey.id}/${user_id}/`)
                    .then(response => {
                            setParticipatedSurveys( prev => ({
                                ...prev,
                                [survey.id] : true //Mark that survey as participated
                            }));
                    })
                    .catch(error => {
                        setParticipatedSurveys( prev => ({
                            ...prev,
                            [survey.id] : false //Mark that survey as NOT participated
                        }));
                    })
            });
       }
    },[allSurvey.results]);


    const handleParticipateClick = (surveyId) => {
        navigate(`/survey/surveyForm/${surveyId}`);
    }

    const handleViewParticipatedForms = () => {

    }


    return (
    <div className='userForms'>
        <div className='uForm-div'>
                <div className="uForm-custom-select-div">
                    <select className="uForm-custom-select">
                        <option value="All">All</option>
                    </select>
                </div>
                <div className='uForm-searchInputDiv'>
                    <input className='uForm-searchInput' type="text" placeholder="Search Here... &#x1F50D;"
                        />
                </div>
                <div className='view-participated-btn'>
                    <button className='uForm-view-parti-btn' type='button' onClick={handleViewParticipatedForms}>View Participated Forms</button>
                </div>
        </div>

        <div className='survey-card-div'>
            {allSurvey.results.map(surv => (
            <div key={surv.id} className='survey-card'> {/*dynamically populated*/}
                <div id='points-div-id'><label id='points-id'>
                    <img src={PointsImg} alt='points-image'/><br/>
                    {surv.reward_points} Pt.</label></div>
                <label id='title-id'>{surv.title}</label> <br/>
                <div id='descr-div-id'><label id='descr-id'>{surv.description}</label></div>
                <div id='btn-div-id'>{ participatedSurveys[surv.id] ?
                    <button className='uForm-view-parti-btn-disabled' type='button' id={`participate-btn-${surv.id}`}
                        disabled >Participate</button>
                :
                    <button className='uForm-view-parti-btn' type='button' id={`participate-btn-${surv.id}`} 
                        onClick={()=>handleParticipateClick(surv.id)}>Participate</button>
                }</div>
            </div>
            ))}
        </div>
        {/* <label>Pagination...</label> */}
    </div>
    )
}

export default UserForms
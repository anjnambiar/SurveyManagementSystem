import './ParticipantList.css';
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ParticipantList = () => {

    const {surveyId} = useParams();
    const [participantList, setParticipantList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/participantList/${surveyId}/`)
            .then(response => setParticipantList(response.data))
            .catch(error => console.log(error))
    }, [surveyId]);

    const handleViewFormClick = (participant) => {
        navigate(`/survey/viewform/${surveyId}/${participant.id}`); //need to send user id and survey id to fetch survey filled by that user
    }

    return (
        <div className="participantList">

                <div className="pl_rightContentsDiv">

                    <div className='pl_backLinkDiv'>
                        <Link className='pl_backLink' to={'/survey/adminForms'} >
                            &lt; Back
                        </Link>
                    </div>

                    <div className='pl_searchDiv'>
                        <div className='pl_searchSubDiv'>
                            <label className='pl_entityLabel'>Entities :</label>
                            <div className="pl_custom-select-div">
                                <select className="pl_custom-select">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </select>
                            </div>

                        </div>
                        <div className='pl_searchInputDiv'>
                            <input className='pl_searchInput' type="text" placeholder="Search &#x1F50D;"/>
                        </div>
                    </div>

                    <div className = 'pl_tableDiv'>
                        <table className='pl_participantsTable'>
                            <thead>
                            <tr>
                                <th id='pl_participantName'>Participant Name &#8645;</th>
                                <th id='pl_participantContact'>Contact Number &#8645;</th>
                                <th id='pl_participantEmail'>Email  &#8645;</th>
                                <th id='pl_viewFormBtnId'></th>
                            </tr>
                            </thead>
                            <tbody>
                                {participantList.map(participant => (
                                    <tr key={participant.id}>
                                        <td>{participant.name}</td>
                                        <td>{participant.contactNum}</td>
                                        <td>{participant.email}</td>
                                        <td><button className='pl_viewFormbtn' type='button'
                                                    onClick={()=>handleViewFormClick(participant)}>View form</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='pl_participantTableEntryCountDiv'>
                        <label className='pl_showingLabel'>Showing 1 to {participantList.length} of {participantList.length} entries</label>
                        <label className='pl_paginationLabel'>*Pagination component comes here</label>
                    </div>

                </div>

            </div>
    );
}

export default ParticipantList;
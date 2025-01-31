import './UserForms.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PointsImg from '../../../images/PointsImg.png';
import ReactPaginate from 'react-paginate';

// User > Forms
const UserForms = () => {

    const navigate = useNavigate();
    const [allSurvey, setAllSurvey] = useState({results:[]});
    const [participatedSurveys, setParticipatedSurveys] = useState({});
    const user_id = localStorage.getItem('user_id');
    const [pageSize, setPageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    // load all surveys available
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/addSurvey/?page=${currentPage}&page_size=${pageSize}`)
        .then(response => {
            setAllSurvey(response.data);
            setTotalPages(response.data.total_pages);
        })
        .catch(error => console.log(error))
    }, [currentPage, pageSize]);

    // disable participated survey buttons
    useEffect(() => {
       if(user_id) {
            allSurvey.results.forEach(survey => {
                axios.get(`http://127.0.0.1:8000/survey/surveyResponse/${survey.id}/${user_id}/`)
                    .then(response => {
                        if(response.status === 200) {
                            setParticipatedSurveys( prev => ({
                                ...prev,
                                [survey.id] : true //Mark that survey as participated
                            }));
                        } else if(response.status === 204) {
                            setParticipatedSurveys( prev => ({
                                ...prev,
                                [survey.id] : false //Mark that survey as NOT participated
                            }));
                        }
                    })
                    .catch(error => { console.log(error) })
            });
       }
    },[allSurvey.results]);


    const handleParticipateClick = (surveyId) => {
        navigate(`/survey/surveyForm/${surveyId}`);
    }

    const handleViewParticipatedForms = () => {
        navigate('/survey/userParticipatedForms/');
    }

      // Pagination handling with react pagination
      const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    // Search functionality
    const handleSearchInput = (event) => {
        const searchInputText = event.target.value;
        axios.get(`http://127.0.0.1:8000/survey/addSurvey/?search=${searchInputText}&page_size=${pageSize}`)
            .then(response => {
                setAllSurvey(response.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.log(error));
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
                        onChange={handleSearchInput}/>
                </div>
                <div className='view-participated-btn'>
                    <button className='uForm-view-parti-btn' type='button' onClick={handleViewParticipatedForms}>View Participated Forms</button>
                </div>
        </div>

        <div className='survey-card-div'>
            {allSurvey.results ? allSurvey.results.map(surv => (
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
            )) : null}
        </div>
        <div className='formTableEntryCountDiv'>
        {   allSurvey.length !== 0 ?
            <div className='paginationLabel'>
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                />
            </div>
            : 'No entries available' }
        </div>

    </div>
    )
}

export default UserForms
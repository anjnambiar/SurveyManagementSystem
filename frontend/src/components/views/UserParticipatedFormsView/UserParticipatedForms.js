import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PointsImg from '../../../images/PointsImg.png';
import { Link , useNavigate} from 'react-router-dom';

// User > Forms > Click View Participated Forms
const UserParticipatedForms = () => {

    const user_id = localStorage.getItem('user_id');
    const [participatedFormList, setParticipatedFormList] = useState({results:[]});
    const [pageSize, setPageSize] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    // Get all the surveys this user participated in
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/userParticipated/${user_id}/?page=${currentPage}&page_size=${pageSize}`)
        .then(response => {
            setParticipatedFormList(response.data);
            setTotalPages(response.data.total_pages);
        })
        .catch(error => console.log(error))
    },[currentPage, pageSize]);

    // Pagination handling with react pagination
    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleViewFormClick = (surveyId) => {
        navigate(`/survey/viewform/${surveyId}/${user_id}`); //need to send user id and survey id to fetch survey filled by that user
    }

    // Search functionality
    const handleSearchInput = (event) => {
        const searchInputText = event.target.value;
        axios.get(`http://127.0.0.1:8000/survey/userParticipated/${user_id}/?search=${searchInputText}&page_size=${pageSize}`)
            .then(response => {
                setParticipatedFormList(response.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.log(error));
    }

    return (

        <div className='userForms'>
        <div className='uForm-div'>
            <div><Link className='backLink' to={'/survey/userForms'} > &lt; Back </Link></div>
            <div className='view-participated-btn'> {/*classnames taken from parent component*/}
                    <input className='uForm-searchInput' type="text" placeholder="Search Here... &#x1F50D;"
                        onChange={handleSearchInput}/>
                </div>
        </div>

        <div className='survey-card-div'>
            {participatedFormList.results ? participatedFormList.results.map(surv => (
            <div key={surv.id} className='survey-card'> {/*dynamically populated*/}
                <div id='points-div-id'><label id='points-id'>
                    <img src={PointsImg} alt='points-image'/><br/>
                    {surv.reward_points} Pt.</label></div>
                <label id='title-id'>{surv.title}</label> <br/>
                <div id='descr-div-id'><label id='descr-id'>{surv.description}</label></div>
                <div id='btn-div-id'>
                    <button className='uForm-view-parti-btn' type='button' id={`participate-btn-${surv.id}`}
                        onClick={()=>handleViewFormClick(surv.id)}>View Form</button>
                </div>
            </div>
            )) : null}
        </div>
        <div className='formTableEntryCountDiv'>
        {   participatedFormList.results !== 0 ?
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

export default UserParticipatedForms;
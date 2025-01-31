import './ParticipantList.css';
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// Admin > Forms > View Participants
const ParticipantList = () => {

    const {surveyId} = useParams();
    const [participantList, setParticipantList] = useState({results:[]});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // Calculate the range of items being shown
    const startIndex = (currentPage - 1) * pageSize + 1; // First entry on current page
    const endIndex = Math.min(currentPage * pageSize, participantList.count); // Last entry on current page
    const navigate = useNavigate();

    // users participated in the given survey
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/participantList/${surveyId}/?page=${currentPage}&page_size=${pageSize}`)
            .then(response => {
                setParticipantList(response.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.log(error))
    }, [surveyId, currentPage, pageSize]);

    const handleViewFormClick = (participant) => {
        navigate(`/survey/viewform/${surveyId}/${participant.id}`); //need to send user id and survey id to fetch survey filled by that user
    }

     // Pagination handling with react pagination
     const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    // Search functionality
    const handleSearchInput = (event) => {
        const searchInputText = event.target.value;
        axios.get(`http://127.0.0.1:8000/survey/participantList/${surveyId}/?search=${searchInputText}&page_size=${pageSize}`)
            .then(response => {
                setParticipantList(response.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.log(error));
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
                            <input className='pl_searchInput' type="text" placeholder="Search &#x1F50D;"
                            onChange={handleSearchInput}/>
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
                                {participantList.results ? participantList.results.map(participant => (
                                    <tr key={participant.id}>
                                        <td>{participant.name}</td>
                                        <td>{participant.contactNum}</td>
                                        <td>{participant.email}</td>
                                        <td><button className='pl_viewFormbtn' type='button'
                                                    onClick={()=>handleViewFormClick(participant)}>View form</button></td>
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    </div>

                    <div className='pl_participantTableEntryCountDiv'>
                    {   participantList.length !== 0 ?
                        <> <label className='pl_showingLabel'>
                            Showing {startIndex} to {endIndex} of {participantList.length} entries
                        </label>
                        <div className='pl_paginationLabel'>
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
                        </div> </>
                        : 'No entries available'  }
                </div>

                </div>

            </div>
    );
}

export default ParticipantList;
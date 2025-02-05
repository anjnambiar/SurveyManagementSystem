import ReactPaginate from "react-paginate";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


// Admin > Users
function User() {

    const [userList, setUserList] = useState({results:[]});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // Calculate the range of items being shown
    const startIndex = (currentPage - 1) * pageSize + 1; // First entry on current page
    const endIndex = Math.min(currentPage * pageSize, userList.count); // Last entry on current page
    const navigate = useNavigate();

    // fetch all users
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/login/userFetch/?page=${currentPage}&page_size=${pageSize}`)
        .then(response => {
            setUserList(response.data);
            setTotalPages(response.data.total_pages);
        })
        .catch(error => console.log(error))
    }, [currentPage, pageSize])

     // Pagination handling with react pagination
     const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    // Search functionality
    const handleSearchInput = (event) => {
        const searchInputText = event.target.value;
        axios.get(`http://127.0.0.1:8000/login/userFetch/?search=${searchInputText}&page_size=${pageSize}`)
            .then(response => {
                setUserList(response.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.log(error));
    }

      // Handle dropdown click on each form row
      const handleFormActionDropdownClick = (event, user) => {
        if(event.target.value === 'delete') { //delete the survey - set status to false
            axios.delete(`http://127.0.0.1:8000/login/userDetails/${user.id}/`)
            .then(response => {
                if(response.status === 200) {
                    user.is_active = false;
                    navigate('/survey/user');
                }
            })
            .catch(error => console.log("Delete user error : ",error))
        }
        if(event.target.value === 'view_forms') { //navigate to show all the forms participated by the user
            navigate(`/survey/userSurvey/${user.id}`);
        }
    }

    // Entity dropdown change / page size change
    const handleEntityChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(1);  // Reset to first page when page size changes
    }


    return(
        <div className="userView">

        <div className="pl_rightContentsDiv">

            <div className='pl_searchDiv'>
                <div className='pl_searchSubDiv'>
                    <label className='pl_entityLabel'>Entities :</label>
                    <div className="pl_custom-select-div">
                        <select className="pl_custom-select" onChange={handleEntityChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
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
                        <th id='pl_participantName'> Name &#8645;</th>
                        <th id='pl_participantContact'>Contact Number &#8645;</th>
                        <th id='pl_participantEmail'>Email  &#8645;</th>
                        <th id='pl_reward_points'>Total Points  &#8645;</th>
                        <th id='pl_status'>Status  &#8645;</th>
                        <th id='pl_viewFormBtnId'></th>
                        <th id='formActionId'></th>
                    </tr>
                    </thead>
                    <tbody>
                        {userList.results ? userList.results.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.contactNum}</td>
                                <td>{user.email}</td>
                                <td>{user.reward_points} pt</td>
                                <td>{user.is_active === true ?
                                            (<><span className="active-form">●</span><span>Active</span></>) :
                                            (<><span className="deleted-form">●</span><span>Deleted</span></>)
                                        }</td>
                                { !user.is_staff && (
                                    <td>
                                    <select id='formAction_select' className="formAction-dropdown"
                                            onChange={(event)=>handleFormActionDropdownClick(event,user)}>
                                            <option></option>
                                            {user.is_active === true && <option value='delete'>Delete</option> }
                                            <option value='view_forms'>View Participated Forms</option>
                                    </select>
                                    </td>
                                )}
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </div>

            <div className='pl_participantTableEntryCountDiv'>
            {   userList.length !== 0 ?
                <> <label className='pl_showingLabel'>
                    Showing {startIndex} to {endIndex} of {userList.count} entries
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

export default User;
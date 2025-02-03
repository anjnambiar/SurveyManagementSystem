import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// Admin > Users > View User Participated Forms/Survey
const UserSurvey = () => {

    const navigate = useNavigate();
    const [tableData, setTableData] = useState({results:[]});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // Calculate the range of items being shown
    const startIndex = (currentPage - 1) * pageSize + 1; // First entry on current page
    const endIndex = Math.min(currentPage * pageSize, tableData.count); // Last entry on current page
    const {userId} = useParams();

    useEffect(() => {
        // Fetch form table data from an API
        axios.get(`http://127.0.0.1:8000/survey/userParticipated/${userId}/?page=${currentPage}&page_size=${pageSize}`)
          .then(response => {
            setTableData(response.data);
            setTotalPages(response.data.total_pages);
        })
          .catch(error => console.log(error));
    }, [currentPage, pageSize]); // Re-run on page size change


    // Pagination handling with react pagination
    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    // Search functionality
    const handleSearchInput = (event) => {
        const searchInputText = event.target.value;
        axios.get(`http://127.0.0.1:8000/survey/userParticipated/${userId}/?search=${searchInputText}&page_size=${pageSize}`)
            .then(response => {
                setTableData(response.data);
                setTotalPages(response.data.total_pages);
            })
            .catch(error => console.log(error));
    }

    // Entity dropdown change / page size change
    const handleEntityChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(1);  // Reset to first page when page size changes
    }


  return (
    <div className='userSurvey'>

        <div className="rightContentsDiv">

        <div>
            <Link className='backLink' to={'/survey/user'} style={{float:'left', margin:'20px'}} >
                    &lt; Back </Link>
        </div>

        <div className='searchDiv'>
            <div className='searchSubDiv'>
                <label className='entityLabel'>Entities :</label>
                <div className="custom-select-div">
                    <select className="custom-select" onChange={handleEntityChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

            </div>
            <div className='searchInputDiv'>
                <input className='searchInput' type="text" placeholder="Search &#x1F50D;"
                        onChange={handleSearchInput}/>
            </div>
        </div>

        <div className = 'tableDiv'>
            <table className='formTable'>
                <thead>
                <tr>
                    <th id='formName'>Form Name &#8645;</th>
                    <th id='formDescription'>Description &#8645;</th>
                    <th id='formPoints'>Points &#8645;</th>
                    <th id='formStatus'>Status &#8645;</th>
                </tr>
                </thead>
                <tbody>
                    { tableData.results ? tableData.results.map(tableEntry => (
                        <tr key={tableEntry.id}>
                            <td>{tableEntry.title}</td>
                            <td>{tableEntry.description}</td>
                            <td>{tableEntry.reward_points} pt</td>
                            <td>{tableEntry.status === true ?
                                    (<><span className="active-form">●</span><span>Active</span></>) :
                                    (<><span className="deleted-form">●</span><span>Deleted</span></>)
                                }</td>
                        </tr>
                    )) : null}
                </tbody>
            </table>
        </div>

        <div className='formTableEntryCountDiv'>
        {   tableData.length !== 0 ?
            <><label className='showingLabel'>
                Showing {startIndex} to {endIndex} of {tableData.count} entries
            </label>
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
            </div> </>
            : 'No entries available'  }
        </div>

        </div>

    </div>
  )

}

export default UserSurvey;
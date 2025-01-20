import './AdminForms.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import axios from 'axios';


function AdminForms () {

    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch form table data from an API
    axios.get('http://127.0.0.1:8000/survey/addSurvey/')
      .then(response => response.data)
      .then(tableData => setTableData(tableData));
    }, []);


    const handleAddFormClick = () => {
        navigate('/survey/addForms');
    }

    const handleFormActionDropdownClick = () => {
        let selectValue = document.getElementById('formAction_select').value;
        if(selectValue === 'delete') navigate('');
        if(selectValue === 'view_form') navigate('/survey/viewForm');
        if(selectValue === 'view_participants') navigate('');
    }

    return (
        <div className="adminFormsDiv">

            <div className="rightContentsDiv">

                <div className="addFormButtonDiv">
                    <button type='button' className='addFormButton'
                    onClick = {handleAddFormClick}
                    >+ Add Form</button>
                </div>

                <div className='searchDiv'>
                    <div className='searchSubDiv'>
                        <label className='entityLabel'>Entities :</label>
                        <div className="custom-select-div">
                            <select className="custom-select">
                                <option value="100">100</option>
                                <option value="50">50</option>
                                <option value="25">25</option>
                            </select>
                        </div>

                    </div>
                    <div className='searchInputDiv'>
                        <input className='searchInput' type="text" placeholder="Search &#x1F50D;"/>
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
                            <th id='formActionId'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {tableData.map(tableEntry => (
                                <tr key={tableEntry.id}>
                                    <td>{tableEntry.title}</td>
                                    <td>{tableEntry.description}</td>
                                    <td>{tableEntry.reward_points}</td>
                                    <td>{tableEntry.status == true ? "Active" : "Deleted"}</td>
                                    <td>
                                    { tableEntry.status == true ?
                                        <select id='formAction_select'
                                            className="formAction-dropdown"
                                            onChange={handleFormActionDropdownClick}>
                                                <option value='delete'></option>
                                            <option value='delete'>Delete</option>
                                            <option value='view_form'>View Form</option>
                                            <option valuw='view_participants'>View Participant List</option>
                                        </select>
                                        : null }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='formTableEntryCountDiv'>
                    <label className='showingLabel'>Showing 1 to {tableData.length} of {tableData.length} entries</label>
                    <label className='paginationLabel'>*Pagination component comes here</label>
                </div>

            </div>

        </div>
    );
}
export default AdminForms;
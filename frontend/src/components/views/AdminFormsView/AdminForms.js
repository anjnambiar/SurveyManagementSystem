import './AdminForms.css';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';


function AdminForms () {

    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch form table data from an API
    fetch('')
      .then(response => response.json())
      .then(tableData => setTableData(tableData));
    }, []);


    const handleAddFormClick = () => {
        navigate('/survey/addForms');
    }

    const handleFormActionDropdownClick = () => {
        let selectValue = document.getElementById('formAction_select').value;
        if(selectValue === 'delete') navigate('');
        if(selectValue === 'view_form') navigate('/survey/viewForm');
        if(selectValue === 'view_parti') navigate('');
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
                                <tr key={tableEntry.id}> {/* code to be changed */}
                                    <td>{tableEntry.id}</td>
                                    <td>{tableEntry.name}</td>
                                    <td>{tableEntry.email}</td>
                                    <td>
                                        <select id='formAction_select'
                                            className="formAction-dropdown"
                                            onChange={handleFormActionDropdownClick}>
                                            <option value='delete'>Delete</option>
                                            <option value='view_form'>View Form</option>
                                            <option valuw='view_parti'>View Participant List</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        {/* <tr>
                            <td>form 1</td>
                            <td>form 1 description</td>
                            <td>10 pt</td>
                            <td>Active</td>
                            
                        </tr> */}
                        </tbody>
                    </table>
                </div>

                <div className='formTableEntryCountDiv'>
                    <label className='showingLabel'>Showing 1 to 5 of 5 entries</label>
                    <label className='paginationLabel'>Pagination component comes here</label>
                </div>

            </div>

        </div>
    );
}
export default AdminForms;
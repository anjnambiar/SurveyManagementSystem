import './AdminForms.css';
import { replace, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


function AdminForms () {

    const navigate = useNavigate();

    const handleAddFormClick = () => {
        console.log("handleAddFormClick");
        navigate('/survey/addForms');
    }

    return (
        <div className="adminFormsDiv">

            <div className="rightContentsDiv">

                <div className="addFormButtonDiv">
                    <button className='addFormButton'
                    onClick = {handleAddFormClick}
                    >+ Add Form</button>
                </div>

                <div className='searchDiv'>
                    <div className='searchSubDiv'>
                        <label className='entityLabel'>Entities :</label>
                        <div className="dropdown">
                            <button className="dropbtn">
                                100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2304;
                            </button>
                            <div className="dropdown-content">
                                <a href="#">100</a>
                                <a href="#">50</a>
                                <a href="#">25</a>
                            </div>
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
                            <th>Form Name &#8645;</th>
                            <th id='description'>Description &#8645;</th>
                            <th>Form Points &#8645;</th>
                            <th>Form Status &#8645;</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>form 1</td>
                            <td>form 1 description</td>
                            <td>10 pt</td>
                            <td>Active</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td>form 2</td>
                            <td>form 2 description</td>
                            <td>20 pt</td>
                            <td>Deleted</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td>form 3</td>
                            <td>form 3 description</td>
                            <td>20 pt</td>
                            <td>Deleted</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td>form 4</td>
                            <td>form 4 description</td>
                            <td>10 pt</td>
                            <td>Active</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td>form 5</td>
                            <td>form 5 description</td>
                            <td>20 pt</td>
                            <td>Deleted</td>
                        </tr>
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
import './AdminForms.css';

function AdminForms () {

    return (
        <div className="adminFormsDiv">

            <div className="headerSection">
                <span className="headerLeft">Forms</span>
                <span className="headerRight">User Name</span>
            </div>

            <div className="rightContentsDiv">

                <div className="addFormButtonDiv">
                    <button className='addFormButton'>+ Add Form</button>
                </div>

                <div className='searchDiv'>
                    <div className='searchSubDiv'>
                        <label className='entityLabel'>Entities :</label>
                        <div class="dropdown">
                            <button class="dropbtn">
                                100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x2304;
                            </button>
                            <div class="dropdown-content">
                                <a href="#">100</a>
                                <a href="#">50</a>
                                <a href="#">25</a>
                            </div>
                        </div>
                    </div>
                    <div className='searchInputDiv'>
                        <input type="text" placeholder="Search &#x1F50D;"/>
                    </div>
                </div>

                <div className = 'tableDiv'>
                    <table className='formTable'>
                        <tr>
                            <th>Form Name &#8645;</th>
                            <th id='description'>Description &#8645;</th>
                            <th>Form Points &#8645;</th>
                            <th>Form Status &#8645;</th>
                        </tr>
                        <tr>
                            <td>form 1</td>
                            <td>form 1 description</td>
                            <td>10 pt</td>
                            <td>Active</td>
                        </tr>
                        <tr>
                            <td>form 2</td>
                            <td>form 2 description</td>
                            <td>20 pt</td>
                            <td>Deleted</td>
                        </tr>
                        <tr>
                            <td>form 3</td>
                            <td>form 3 description</td>
                            <td>20 pt</td>
                            <td>Deleted</td>
                        </tr>
                    </table>
                </div>

            </div>

        </div>
    );
}
export default AdminForms;
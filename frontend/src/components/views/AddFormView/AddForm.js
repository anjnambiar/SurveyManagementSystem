import './AddForm.css';
import { Link , useNavigate} from 'react-router-dom';
import QuestionComponent from './QuestionComponent.js';

function AddForm() {

    const navigate = useNavigate();
 

    return(

        <div className='addFormMain'>
            <form className='addForm'>
                <div className='addFormDiv'>

                    <div className='backLinkDiv'>
                        <Link className='backLink' to={'/survey/adminForms'} >
                        &#9001;  Back</Link>
                    </div>

                    <div className='addForm_Title_Points_div'>

                        <div className='addForm_titleDiv'>
                            <label id='title_label'>Title</label>
                            <input id='title_input' type = 'text'/>
                        </div>
                        <div className='addForm_pointsDiv'>
                            <label id='points_label'>Points</label>
                            <input id='points_input' type = 'text'/>
                        </div>

                    </div>

                    <div className='addForm_descriptionDiv'>
                        <label id='descr_label'>Description</label>
                        <textarea id='descr_input' type = 'text' />
                    </div>

                    <div className='questionComponenet_div'>
                        <QuestionComponent/>
                    </div>

                    <div className='addForm_saveCancelbuttonsDiv'>
                        <button type='submit' id='addForm_savebtn'>Save</button>
                        <button type='button' id='addform_cancelbtn' onClick={()=>navigate('/survey/adminForms')}>Cancel</button>
                    </div>

                </div>
            </form>
        </div>

    );
}
export default AddForm;
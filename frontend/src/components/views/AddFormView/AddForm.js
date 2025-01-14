import './AddForm.css';
import { Link } from 'react-router-dom';

function AddForm() {

    return(

        <div className='addForm'>
            <div className='addFormCard'>
                <div>
                    <Link to=''>&#9001;  Back</Link>
                </div>
                <div>
                    <label>Title</label>
                    <input type = 'text'/>
                </div>
                <div>
                    <label>Points</label>
                    <input type = 'text'/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type = 'text'/>
                </div>
                <div>
                    <label>Question</label>
                    <input type = 'text'/>
                </div>
                <div>
                    <label>Select answer type</label>
                   
                </div>
                <div>
                    <button>Add Question</button>
                    <button>Remove Question</button>
                </div>
                <div>
                    <button>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>

    );
}
export default AddForm;
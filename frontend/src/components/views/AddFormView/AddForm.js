import './AddForm.css';
import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import QuestionComponent from './QuestionComponent.js';
import { useState } from 'react';
import axios from 'axios';

// Admin > Forms > Add Form
function AddForm() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [reward_points, setReward_Points] = useState("");
    const [description, setDescription] = useState('');
    const [questions, setQuestion] = useState([
            {
                question_title : '',
                question_type : '',
                options :[
                        { option_name : '' }
            ],}
        ],);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/survey/addSurvey/', // add a new survey
            {title, description, reward_points, questions})
            .then(response => {
                if (response.status === 201)
                    navigate('/survey/adminForms');
                else return Promise.reject('Error: ' + response.statusText);
            }).catch(error => console.log(error))
    };

    return(

        <div className='addFormMain'>
            <form className='addForm' onSubmit={handleSubmit}>
                <div className='addFormDiv'>

                    <div className='backLinkDiv'>
                        <Link className='backLink' to={'/survey/adminForms'} >
                            &lt; Back
                        </Link>
                    </div>

                    <div className='addForm_Title_Points_div'>

                        <div className='addForm_titleDiv'>
                            <label id='title_label'>Title</label>
                            <input className='addForm-input' id='title_input' type = 'text' value = {title} required
                                    onChange={(event)=>setTitle(event.target.value)}/>
                        </div>
                        <div className='addForm_pointsDiv'>
                            <label id='points_label'>Points</label>
                            <input className='addForm-input' id='points_input' type = 'number' value = {reward_points} required
                                    onChange={(event)=>setReward_Points(event.target.value)}/>
                        </div>

                    </div>

                    <div className='addForm_descriptionDiv'>
                        <label id='descr_label'>Description</label>
                        <textarea className='addForm-textarea' id='descr_input' type = 'text'
                                    value = {description} required
                                    onChange={(event)=>setDescription(event.target.value)} />
                    </div>

                    <div className='questionComponenet_div'>
                        <QuestionComponent questions={questions} setQuestion={setQuestion}/>
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
import './AddForm.css';
import { Link, useNavigate } from 'react-router-dom';
import ShortAnswerType from './ShortAnswerType.js';
import { useState } from 'react';
import RadiobtnAnswerType from './RadiobtnAnswerType.js';

function AddForm() {

    const [isRadiobtn, setIsRadiobtn] = useState(false);
    const [isShortAns, setIsShortAns] = useState(false);
    const navigate = useNavigate();

    const handleDropdownClick = (event) => {
       let selectValue = document.getElementById('ans-dropdownId').value;
       if(selectValue === '1') {
        setIsRadiobtn(true);
        setIsShortAns(false);
       } else if(selectValue === '2') {
        setIsRadiobtn(false);
        setIsShortAns(true);
       } else {
        setIsRadiobtn(false);
        setIsShortAns(false);
       }
    }

    return(

        <div className='addFormMain'>
            <form className='addForm'>
                <div className='addFormDiv'>

                    <div className='backLinkDiv'>
                        <Link className='backLink' onClick={() => navigate(-1)} >
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

                    <div className='addForm_quest_ans_div'>

                        <div className='addForm_questionDiv'>
                            <label id='question_label'>Question</label>
                            <input id='question_input' type = 'text'/>
                        </div>

                        <div className="custom-select-div">
                            <select id='ans-dropdownId' className="custom-select"
                            onChange={handleDropdownClick}>
                                <option value="0">Select ans type</option>
                                <option value="1">Radio button</option>
                                <option value="2">Short Answer</option>
                            </select>
                        </div>

                    </div>

                    <div className='AnswerTypeChoiceDiv'>
                       {isRadiobtn ? <RadiobtnAnswerType/> : null}
                        {isShortAns ? <ShortAnswerType/> : null}
                    </div>

                    <div className='addForm_alterQuestionDiv'>
                        <button id='addQuestionButton'>Add Question</button>
                        <button id='removeQuestionButton'>Remove Question</button>
                    </div>

                    <div className='addForm_saveCancelbuttonsDiv'>
                        <button id='addForm_savebtn'>Save</button>
                        <button id='addform_cancelbtn'>Cancel</button>
                    </div>

                </div>
            </form>
        </div>

    );
}
export default AddForm;
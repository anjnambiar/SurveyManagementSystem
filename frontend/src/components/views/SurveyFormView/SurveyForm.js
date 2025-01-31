import './SurveyForm.css';
import React, { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// User > Form > Click Participate > Interactive survey to participate
const SurveyForm = () => {

    const {surveyId} = useParams();
    const [viewFormData, setviewFormData] = useState({questions : []});
    const [responseValue, setResponseValue] = useState({});  // Store responses
    const navigate = useNavigate();

    // all details of survey to populate on the form
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/surveyDetail/${surveyId}`)
        .then(response => setviewFormData(response.data))
        .catch(error => console.log(error))
    }, [surveyId]);

    // Handle radio button change
    const handleRadioChange = (questionId, optionName) => {
        // Update the selected response
        setResponseValue((prevResponses) => ({
            ...prevResponses,
            [questionId]: optionName
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit survey responses by the user
        Object.entries(responseValue).map(([question_id, answer]) => {
            axios.post('http://127.0.0.1:8000/survey/surveySubmit/', {
                survey: surveyId,
                user: localStorage.getItem('user_id'),
                question: question_id,
                answer: answer || ''
            })
            .then(response => {
                navigate('/survey/userForms');
            })
            .catch(error => console.log(error))
        });
    }

    return (
        <div className='viewForm'>

            <div className='viewFormDiv'>

                <div className='vf_backLinkDiv'>
                    <Link className='vf_backLink' to={`/survey/userForms/`} >
                        &lt; Back
                    </Link>
                </div>

                <div className='vf_surveyDiv'>
                    <div className='vf_titleDiv'> <h1 id='vf_title'> {viewFormData.title} </h1> </div>

                    <div className='vf_descriptionDiv'> {viewFormData.description} </div>

                    <div className='vf_questionsDiv'>

                        {viewFormData.questions.map( (question, Qindex) => (

                            <div key={question.id} className='vf_detailsDiv'>

                                <div className='vf_questDiv'>
                                    <span className='vf_index'>Q.{Qindex+1}  </span>
                                    <span className='vf_questTitle'>{question.question_title}</span>
                                </div>

                                {
                                    question.question_type === 'SA' ?
                                        (<div className='saDiv'>
                                            <input id={`saInput-${question.id}`} type='text'
                                                    value={responseValue[question.id] || ''}
                                                    onChange={(event)=>setResponseValue({...responseValue, [question.id]:event.target.value})}/>
                                        </div>)
                                    :
                                        (<div className='mcqDiv'>{
                                            question.options.map(option => (
                                                <span key={option.id} className='mcqSpan'>
                                                    <input id={`mcqInput-${option.id}`}  type='radio'
                                                            checked = {responseValue[question.id] === option.option_name}
                                                            onChange={() => handleRadioChange(question.id, option.option_name)}/>
                                                    <label id={`mcqLabel-${option.id}`}>{option.option_name} </label>
                                                </span>
                                            ))
                                        }</div>)
                                }

                            </div>

                        )) }

                    </div>
                </div>
                <div className='addForm_saveCancelbuttonsDiv'>
                        <button type='submit' id='addForm_savebtn' onClick={handleSubmit}>Save</button>
                        <button type='button' id='addform_cancelbtn' onClick={()=>navigate('/survey/userForms')}>Cancel</button>
                    </div>

            </div>

        </div>
    );

}

export default SurveyForm;
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
               return axios.post(`http://127.0.0.1:8000/login/addReward/${viewFormData.reward_points}/${localStorage.getItem('user_id')}/`) // add reward points when user submits a survey
            })
            .then( response =>
                navigate('/survey/userForms')
            )
            .catch(error => console.log(error))
        });
    }

    return (
        <div className='surveyForm'>

            <div className='surveyFormDiv'>

                <div className='sf_backLinkDiv'>
                    <Link className='sf_backLink' to={`/survey/userForms/`} >
                        &lt; Back
                    </Link>
                </div>

                <div className='sf_surveyDiv'>
                    <div className='sf_titleDiv'> <h1 id='sf_title'> {viewFormData.title} </h1> </div>

                    <div className='sf_descriptionDiv'> {viewFormData.description} </div>

                    <div className='sf_questionsDiv'>

                        {viewFormData.questions.map( (question, Qindex) => (

                            <div key={question.id} className='sf_detailsDiv'>

                                <div className='sf_questDiv'>
                                    <span className='sf_index'>Q.{Qindex+1}  </span>
                                    <span className='sf_questTitle'>{question.question_title}</span>
                                </div>

                                {
                                    question.question_type === 'SA' ?
                                        (<div className='sf_saDiv'>
                                            <input className='sf-saInput-class' id={`sf-saInput-${question.id}`} type='text' required
                                                    value={responseValue[question.id] || ''}
                                                    onChange={(event)=>setResponseValue({...responseValue, [question.id]:event.target.value})}/>
                                        </div>)
                                    :
                                        (<div className='sf_mcqDiv'>{
                                            question.options.map(option => (
                                                <span key={option.id} className='sf_mcqSpan'>
                                                    <input id={`sf-mcqInput-${option.id}`}  type='radio' required
                                                            checked = {responseValue[question.id] === option.option_name}
                                                            onChange={() => handleRadioChange(question.id, option.option_name)}/>
                                                    <label id={`sf-mcqLabel-${option.id}`}>{option.option_name} </label>
                                                </span>
                                            ))
                                        }</div>)
                                }

                            </div>

                        )) }

                    </div>
                </div>
                <div className='sf_addForm_saveCancelbuttonsDiv'>
                        <button type='submit' id='sf_addForm_savebtn' onClick={handleSubmit}>Save</button>
                        <button type='button' id='sf_addform_cancelbtn' onClick={()=>navigate('/survey/userForms')}>Cancel</button>
                    </div>

            </div>

        </div>
    );

}

export default SurveyForm;
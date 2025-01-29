import './ViewForm.css';
import React, { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import axios from 'axios';

const ViewForm = () => {

    const {surveyId, participantId} = useParams();
    const [viewFormData, setviewFormData] = useState({questions : []});
    const [responseValue, setResponseValue] = useState({});

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/surveyDetail/${surveyId}/`)
        .then(response => setviewFormData(response.data))
        .catch(error => console.log(error))
    }, [surveyId]);


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/surveyResponse/${surveyId}/${participantId}/`)
        .then(response => {
            const responseData = response.data.reduce((acc, curr) => {
                                acc[curr.question] = curr.answer;  // Make responseData an object
                                return acc;
                                }, {});
            setResponseValue(responseData);  // Store responses as an object
            })
        .catch(error => console.log(error))
    },[surveyId, participantId]);


    return (
        <div className='viewForm'>

            <div className='viewFormDiv'>

                <div className='vf_backLinkDiv'>
                    <Link className='vf_backLink' to={`/survey/participantList/${surveyId}`} >
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
                                            <input id={`saInput-${question.id}`}
                                                type='text' disabled
                                                value={responseValue[question.id] || ''} />
                                        </div>)
                                    :
                                        (<div className='mcqDiv'>{
                                            question.options.map(option => (
                                            <span key={option.id} className='mcqSpan'>
                                                <input id={`mcqInput-${option.id}`} type='radio' disabled
                                                    checked={responseValue[question.id] === option.option_name}/>  {/*Check if this option was selected based on the response*/}
                                                <label id={`mcqLabel-${option.id}`}>{option.option_name}</label>
                                            </span>
                                            ))
                                        }</div>)
                                }

                            </div>

                        )) }

                    </div>
                </div>

            </div>

        </div>
    );

}

export default ViewForm;
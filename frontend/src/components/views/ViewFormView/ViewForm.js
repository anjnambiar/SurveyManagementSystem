import './ViewForm.css';
import React, { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import axios from 'axios';

const ViewForm = () => {

    const {formId} = useParams();
    const [viewFormData, setviewFormData] = useState({questions : []});

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/surveyDetail/${formId}`)
        .then(response => setviewFormData(response.data))
        .catch(error => console.log(error))
    }, [formId]);


    return (
        <div className='viewForm'>

            <div className='viewFormDiv'>

                <div className='vf_backLinkDiv'>
                    <Link className='vf_backLink' to={`/survey/participantList/${formId}`} >
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
                                            <input id='saInput' type='text' value='' disabled/>
                                        </div>)
                                    :
                                        (<div className='mcqDiv'>{
                                            question.options.map(option => (
                                            <span className='mcqSpan'>
                                            <input id='mcqInput' type='radio' disabled/>{option.option_name}
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
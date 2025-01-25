import React, { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import axios from 'axios';

const ViewForm = () => {

    const {formId} = useParams();
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/surveyDetail/${formId}`)
        .then(response => response.data)
        .then(formData => setFormData(formData))
    },[]);

    return (
        <div className='viewForm'>

            <div className='viewFormDiv'>

                <div className='pl_backLinkDiv'>
                    <Link className='pl_backLink' to={`/survey/participantList/${formId}`} >
                        &lt; Back
                    </Link>
                </div>

                <div> <h1> {formData.title} </h1> </div>

                <div> {formData.description} </div>

                <div>
                    {/* iterate through the questions...
                        display a question
                        SA - display the answer in a disabled input field
                        MCQ - display choices and the marked choice */}
                </div>

            </div>

        </div>
    );

}

export default ViewForm;
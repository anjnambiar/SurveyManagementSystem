import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ViewForm = () => {

  let navigate = useNavigate();

  return (
    <div className='viewForm'>
        <div className='backLinkDiv'>
            <Link className='backLink' onClick={() => navigate(-1)} >
            &#9001;  Back</Link>

            <div className='formDetailsDiv'>
              <label>Form Name</label>
              <label>Form Description</label>
              <div className='view-form-questions'>
                
              </div>
            </div>
        </div>
    </div>
  )
}

export default ViewForm;
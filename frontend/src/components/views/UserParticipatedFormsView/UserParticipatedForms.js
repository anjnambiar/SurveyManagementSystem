import React, { useEffect, useState } from 'react';
import axios from 'axios';

// User > Forms > Click View Participated Forms
const UserParticipatedForms = () => {

    const user_id = localStorage.getItem('user_id');
    const [participatedFormList, setParticipatedFormList] = useState([]);

    // Get all the surveys this user participated in
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/survey/userParticipated/${user_id}/`)
        .then(response => {
            setParticipatedFormList(response.data)
        })
        .catch(error => console.log(error))
       
    });

    return (
        <div className='userParticipatedForms'>
            {participatedFormList.map((participatedForm) => (
                <div>{participatedForm.title}</div>
            ))}
        </div>
    )
}

export default UserParticipatedForms;
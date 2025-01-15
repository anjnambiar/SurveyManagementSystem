import { useState } from 'react';
import './AddForm.css';

const RadiobtnAnswerType = () => {

 const [divCount, setDivCount] = useState(1);

  function handleAddRadioClick(event) {
    event.preventDefault();
    setDivCount(divCount+1);
  }

  function handleRemoveRadioClick(event) {
    event.preventDefault();
    if(divCount>0) setDivCount(divCount-1);

  }


  return (

    <div>

      {Array.from(Array(divCount)).map((_, index) => (
        <div key={index} className='radiobtnAnswerType'>
           <input className='radiobtnAnsType_input'
                onChange={() => {}}/>
        </div>
        ))}

      <button className='radiobtnAnsType_button'
              onClick={handleRemoveRadioClick}> -
      </button>
      <button className='radiobtnAnsType_button'
              onClick={handleAddRadioClick}> +
      </button>

    </div>

  )
}

export default RadiobtnAnswerType;
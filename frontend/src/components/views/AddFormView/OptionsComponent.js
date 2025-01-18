import { useState } from 'react';
import './AddForm.css';


const OptionsComponent = () => {

  const [optionInputs, setOptionInputs] = useState([{id : Date.now() , value : ""}]);

  const handleAddOptionComponent = () => {
    const newInputOption = {id : Date.now() , value : ""};
    setOptionInputs([...optionInputs, newInputOption]);
  };

  const handleRemoveOptionComponent = (id) => {
    if (optionInputs.length > 1) {
      setOptionInputs(optionInputs.filter((optionInput) => optionInput.id !== id));
    } 
  };

  const handleInputChange = (id, newValue) => {
    const updatedInputs = optionInputs.map((optionInput) =>
      optionInput.id === id ? {...optionInput, value : newValue} : optionInput
    );
    setOptionInputs(updatedInputs);
  };


  return (
      <>
      { optionInputs.map((optionInput) =>
       ( <div key={optionInput.id} className='optionsComponent'>

          <input className='optionsComponent_input' placeholder={`Option ${optionInput.id}`}
                type='text' value={optionInput.value} name={`Option ${optionInput.id}`}
                onChange={(event)=>handleInputChange(optionInput.id, event.target.value)}/>
          <button type='button' className='optionsRemoveComponent_button' id='removeBtn'
                  onClick={()=>handleRemoveOptionComponent(optionInput.id)}>-</button>
        </div>

      ))}

      <button type='button' className='optionsAddComponent_button' id='addBtn'
              onClick={handleAddOptionComponent}>+</button>
      </>
  );
}


export default OptionsComponent;
import { useEffect, useState } from 'react';
import './AddForm.css';

// Admin > Forms > Add Form > Options Component (dynamic)
const OptionsComponent = ({id, setQuestDivs, questDivs}) => {

    const [optionInputs, setOptionInputs] = useState([{id : 1 , value : ""}]);

    const handleAddOptionComponent = () => {
      const newInputOption = {id : optionInputs[optionInputs.length-1].id + 1, value : ""};
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

    useEffect(()=>{
      const filteredQuest =  questDivs.filter((questDiv)=>questDiv.id === id);
      if (filteredQuest.length > 0) {
        //We're using the map() function to iterate through the previous questDivs state (prev).
        // For each obj (which represents a question):
        //If the obj.id matches the filteredQuest[0].id, it means we've found the correct question,
        // so we replace the old question object with the updated one (filteredQuest[0]).
        //If the obj.id does not match, we leave that question unchanged.
        filteredQuest[0].options = optionInputs;
        const updatedOpinions = (prev) =>
          prev.map((obj) =>
            obj.id === filteredQuest[0].id ? filteredQuest[0] : obj);
        setQuestDivs(updatedOpinions);
      }
    },[optionInputs]);


    return (
        <>
        { optionInputs.map((optionInput) =>
        ( <div key={optionInput.id} className='optionsComponent'>

            <input className='optionsComponent_input addForm-input' placeholder={`Option ${optionInput.id}`}
                  type='text' value={optionInput.value} name={`Option ${optionInput.id}`} required
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
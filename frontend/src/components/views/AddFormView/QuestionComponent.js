import React from 'react';
import OptionsComponent from './OptionsComponent.js';
import './AddForm.css';
import { useState } from 'react';

const QuestionComponent = () => {

    const [isRadiobtn, setIsRadiobtn] = useState(false);
    const [questDivs, setQuestDivs] = useState([{id:Date.now(), inputValue:"", dropdwnValue:"0"}]);

    const handleAddQuestionClick = () => {
        const newQuest = {id : Date.now(), inputValue:"", dropdwnValue:"0"};
        setQuestDivs([...questDivs, newQuest]);
    }

    const handleRemoveQuestionClick = (id) => {
        if(questDivs.length > 1) {
            setQuestDivs(questDivs.filter((questDiv)=>questDiv.id !== id));
        }
    }

    const handleInputChange = (id, newValue) => {
        const updatedQuest = questDivs.map((questDiv)=>
            questDiv.id === id ? {...questDiv, inputValue : newValue} : questDiv
        );
        setQuestDivs(updatedQuest);
    }

    const handleDropdownClick = (id, newValue) => {
        let selectValue = document.getElementById('ans-dropdownId').value;
        if(selectValue === '1') {
         setIsRadiobtn(true);
        } else {
         setIsRadiobtn(false);
        }
        const updatedDropdwn = questDivs.map((questDiv)=>
            questDiv.id === id ? {...questDiv, dropdwnValue : newValue} : questDiv
        );
        setQuestDivs(updatedDropdwn);
     }


  return (
    <>
        { questDivs.map((questDiv) => (

                <div key={questDiv.id} className='questionComponent'>

                    <div className='questionComponent_div'>

                        <div className='question-div'>
                            <label id='question_label'>Question</label>
                            <input id='question_input' type = 'text' placeholder = {`Question ${questDiv.id}`}
                                    value={questDiv.inputValue} name={`Question ${questDiv.id}`}
                                    onChange={(event)=>{handleInputChange(questDiv.id, event.target.value)}}/>
                        </div>

                        <div className="custom-select-div">
                            <select id='ans-dropdownId' className="custom-select" value={questDiv.dropdwnValue}
                            onChange={(event)=>handleDropdownClick(questDiv.id, event.target.value)}>
                                <option value="0">Select ans type</option>
                                <option value="1">Radio button</option>
                                <option value="2">Short Answer</option>
                            </select>
                        </div>

                    </div>

                    <div className='optionsComponentDiv'>
                        { isRadiobtn ? <OptionsComponent/> : null }
                    </div>

                    <div className='addForm_alterQuestionDiv'>
                        <button type='button' id='addQuestionButton'
                                onClick={handleAddQuestionClick}
                                >Add Question</button>
                        <button type='button' id='removeQuestionButton'
                                onClick={()=>handleRemoveQuestionClick(questDiv.id)}
                                >Remove Question</button>
                    </div>

                </div>

            ))}
        </>
  );

}

export default QuestionComponent;
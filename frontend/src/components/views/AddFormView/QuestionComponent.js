import React, { useEffect } from 'react';
import OptionsComponent from './OptionsComponent.js';
import './AddForm.css';
import { useState } from 'react';

const QuestionComponent = ({questions, setQuestion}) => {

    const [questDivs, setQuestDivs] = useState([{id:1, inputValue:"", dropdwnValue:"SA", options:[ { option_name:'' }]}]);

    useEffect(() => {
        const updatedQuestions = questDivs.map((questDiv) => ({
            question_title : questDiv.inputValue,
            question_type : questDiv.dropdwnValue,
            options : questDiv.options.map( (op) => ( {option_name : op.value} ) )
        }));
        setQuestion(updatedQuestions);
    }, [questDivs, setQuestion]);

    const handleAddQuestionClick = () => {
        const newQuest = {id : questDivs[questDivs.length-1].id+1, inputValue:"", dropdwnValue:"SA",  options:[{ option_name:'' }]};
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
                                    value={questDiv.inputValue} name={`Question ${questDiv.id}`} required
                                    onChange={(event)=>{handleInputChange(questDiv.id, event.target.value)}}/>
                        </div>

                        <div className="custom-select-div">
                            <select id='ans-dropdownId' className="custom-select" value={questDiv.dropdwnValue}
                            onChange={(event)=>handleDropdownClick(questDiv.id, event.target.value)}>
                                    <option value="SA">Short Answer</option>
                                    <option value="MCQ">Radio button</option>
                            </select>
                        </div>

                    </div>

                    <div className='optionsComponentDiv'>
                        { questDiv.dropdwnValue === "MCQ" ?
                            <OptionsComponent
                                id={questDiv.id} setQuestDivs={setQuestDivs}
                                questDivs={questDivs}/>
                            : null
                        }
                    </div>

                    <div className='addForm_alterQuestionDiv'>
                        { questDivs[questDivs.length-1].id === questDiv.id &&
                            <button type='button' id='addQuestionButton'
                                onClick={handleAddQuestionClick}
                                >Add Question</button>
                        }
                        <button type='button' id='removeQuestionButton'
                                onClick={()=>handleRemoveQuestionClick(questDiv.id)}
                                disabled={questDivs.length <= 1}
                                >Remove Question</button>
                    </div>

                </div>

            ))}
        </>
  );

}

export default QuestionComponent;
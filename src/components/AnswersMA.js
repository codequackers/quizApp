import { useState } from 'react';
import reactStringReplace from 'react-string-replace';
import shuffler from '../modules/shuffler';

function AnswersMA(props) {
    const isActive = props.active;
    const results = props.results;
    
    //results ? console.log(results) : console.log('Result not ready');
    

    // Shuffle answers in a random order
    const answers = shuffler([...props.correct, ...props.incorrect], props.shuffleSeed);

    // State with an array of the selected answers.
    const [selected, setSelected] = useState([]);

    // Convert array of answer strings to html elements
    const displayAnswers = answers.map((answer) => {
        let reactAnswer = reactStringReplace(answer, /(\<code\>.+?\<\/code\>)/, (match, i) => {
            /*
                1. Find index of the first > and the second <
            */
           const start = match.indexOf('>');
           const end = match.indexOf('<',start);
           const codeText = match.slice(start+1, end);
           return <pre key={i}> <code >{codeText}</code> </pre>
        });


        let classes = 'answer ';
        // If answer is in the selected state-array, add the class selected
        if (selected.indexOf(answer) !== -1) {
            classes += 'selected ';
        }
        
        if(isActive){
            return (
                <div key={answer}
                    className={classes}
                    onClick={(e) => {handleSelect(answer);}}
                >
                    <input type="checkbox" id={answer} name="answers" value={answer}
                    />
                    <label
                        htmlFor={answer}
                    >
                        <span className='outerCheck'><span className='innerCheck'></span></span>
                        {reactAnswer}
                    </label>
                </div>
            );
        } else {
            // Find the correct class from the results array
            const result = results.find(elem => elem.answer === answer);
            
            return (
                <div key={answer}
                    className={classes}
                >
                    <input type="checkbox" id={answer} name="answers" value={answer} disabled
                    />
                    <label
                        htmlFor={answer}
                    >
                        <span className='outerCheck'><span className='innerCheck'></span></span>
                        {reactAnswer}
                    </label>
                    <span className={result ? result.class : null}>{result ? 
                    result.class === 'correct' ? 'Korrekt' : 'Beklager, feil svar' :
                    null}</span>
                </div>
            );
        }


        
    });


    // Triggers when an answer is clicked. Toggles the selection on or off.
    function handleSelect(answer) {
        // Get the selected DOM-element
        const currentAnswerElement = document.getElementById(answer);

        // Change the checked status to opposite of current status
        currentAnswerElement.checked = !currentAnswerElement.checked;
        
        // If the answer is already selected, remove it from the selected array.
        // Else, add it to the current answers array.
        if (selected.indexOf(answer) !== -1) {
            let updatedSelection = selected.filter((selection) => selection !== answer);
            setSelected(updatedSelection);
        } else {
            setSelected([...selected, answer]);
            
        }
    }

    return (
        <>
            {displayAnswers}
        </>
    );
}

export default AnswersMA;
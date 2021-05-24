import { useState } from 'react';
import reactStringReplace from 'react-string-replace';
import shuffler from '../modules/shuffler';

function AnswersMC(props) {

    const isActive = props.active;
    //let selectedClasses = 'answer ' + props.classes;

    // Shuffle answers in a order based on a random seed generated when the quiz is started.
    const answers = shuffler([props.correct, ...props.incorrect], props.shuffleSeed);

    // State which contains the selected answer as a string
    const [selected, setSelected] = useState(null);

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
        /* 
        If the question is active OR it's not active AND selected, display
        the question with an input. Else, display just the div and label.
        */
        if(isActive || (selected === answer)){ // Test senere: mulig å fjerne !isActive?
            return (
            <div key={answer}
                className={'answer'}
                onClick={(e) => {
                    if (isActive) {
                        handleSelect(answer);
                    }
                }}
            >
                <input type="radio"
                    id={answer}
                    name="answers"
                    value={answer}
                />
                <label htmlFor={answer}
                    onClick={(e) => {
                        e.stopPropagation();
                        return;
                    }}
                    className={props.classes}
                >
                    <span className='outerRadio'><span className='innerRadio'></span></span>
                    {reactAnswer}
                </label>
                <span className={'feedback ' + props.classes}>{props.classes === 'correct' ? 'Korrekt svar' : 'Beklager, feil svar'}</span>
            </div>
        );
    } else if (!isActive) {
        return (
            <div key={answer}
                className={'answer'}
                onClick={(e) => {
                    if (isActive) {
                        handleSelect(answer);
                    }
                }}
            >
                
                <label htmlFor={answer}
                    onClick={(e) => {
                        e.stopPropagation();
                        return;
                    }}
                >
                    <span className='outerRadio'><span className='innerRadio'></span></span>
                    {reactAnswer}
                </label>
                <span className="feedback">Korrekt svar</span>
            </div>
        );
    } else {
        return null;
    }
        
    });

    // Toggle select on an answer when clicked on.
    function handleSelect(answer) {
        
        const currentAnswerElement = document.getElementById(answer);
        if (selected === answer) {
            setSelected(null);
            currentAnswerElement.checked = false;
        } else {
            console.log('AnswersMC');
            console.log(answer);
            setSelected(answer);
            currentAnswerElement.checked = true;
        }


    }

    return (
        <>
            {displayAnswers}
        </>
    )
}

export default AnswersMC;
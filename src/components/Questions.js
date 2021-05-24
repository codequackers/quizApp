import { useState } from 'react';
import Questionheader from './Questionheader';
import Questiontext from './Questiontext';
import AnswersMC from './AnswersMC';
import AnswersMA from './AnswersMA';
import Quizbuttons from './Quizbuttons';

function Questions(props) {

    const questions = props.questions;
    const currentQuestion = props.currentQuestion;
    const score = props.score;
    const setScore = props.setScore;

    const [mcClasses, setMcClasses] = useState(null);
    const [maResults, setMaResults] = useState(null);
    const [newAnswer, setNewAnswer] = useState(true);

    let currentScore = 0;


    // Clicking the "Sjekk svar"-button.
    function handleCheckAnswer() {
        if (!props.lockedQuestions[currentQuestion.index]) {
            switch (questions[currentQuestion.index].type) {
                case 'mc': checkMC(); break;
                case 'ma': checkMA(); break;
                default: console.log('Question type invalid');
            }

            const newLocked = props.lockedQuestions.map((question, index) => index === currentQuestion.index ? true : false);
            props.setLockedQuestions(newLocked);
            /* console.log(props.lockedQuestions); */
        } else {
            console.log('Current question has already been answered');
        }

        console.log(currentScore);

    }

    // Logic for checking the answer on a multiple choice question.
    function checkMC() {
        console.log('Fra Questions.js: Sjekker svar');

        let elems = document.querySelectorAll('input');
        for (let i = 0; i < elems.length; i++) {

            if (elems[i].checked) {
                if (elems[i].value === questions[currentQuestion.index].correct) {
                    /* INCOMPLETE - Give feedback in UI on correct */
                    console.log('Riktig');
                    setScore(score + 1);
                    currentScore = 1;
                    setMcClasses('correct');

                } else {
                    /* INCOMPLETE - Give feedback in UI on incorrect */
                    console.log('Galt');
                    currentScore = 0;
                    setMcClasses('incorrect');
                }

            }
        }
    }

    // Logic for checking the answer on a multiple answers question.
    //let maResults = [];
    function checkMA() {
        console.log('Multiple answers');
        let tempResults = [];

        console.log('Checking...');
        let elems = document.querySelectorAll('input');

        /*
        Scoring:
        If every option is checked or none are, set score equal to zero.
        Otherwise, score 1/(number of options) for every correct one.

        */

        let tempScore = 0;
        let checked = 0;
        
        for (let i = 0; i < elems.length; i++) {
            if (elems[i].checked) {
                checked += 1;
                // Checked and correct
                if (questions[currentQuestion.index].correct.indexOf(elems[i].value) !== -1) {
                    /* INCOMPLETE - Give feedback in UI on correct */
                    console.log('Riktig');

                    tempResults.push({
                        "answer": elems[i].value,
                        "class": "correct"
                    });

                    /* settempResults([...tempResults, {
                        "answer": elems[i].value,
                        "class": "correct"
                    }]); */

                    //setScore(score + 0);
                    tempScore += 1/elems.length;

                } else {
                    // Checked and incorrect
                    /* INCOMPLETE - Give feedback in UI on incorrect */
                    console.log('Galt');

                    tempResults.push({
                        "answer": elems[i].value,
                        "class": "incorrect"
                    });

                    /* settempResults([...tempResults, {
                        "answer": elems[i].value,
                        "class": "incorrect"
                    }]); */
                }
            } else {
                // Not checked and correct
                if (questions[currentQuestion.index].correct.indexOf(elems[i].value) !== -1) {
                    tempResults.push({
                        "answer": elems[i].value,
                        "class": "incorrect"
                    });
                    /* settempResults([...tempResults, {
                        "answer": elems[i].value,
                        "class": "incorrect"
                    }]); */
                } else {
                    // Not checked and inorrect
                    tempResults.push({
                        "answer": elems[i].value,
                        "class": "correct"
                    });
                    /* settempResults([...tempResults, {
                        "answer": elems[i].value,
                        "class": "correct"
                    }]); */

                    tempScore += 1/elems.length;
                }

            }

        }

        setMaResults(tempResults);
        console.log(`Score ${tempScore}`)
        if(checked === 0 || checked === elems.length){
            setScore(0);
        } else {
            setScore(score + tempScore);
        }
    }

    // Called when clicking the "Neste spørsmål"-button.
    function handleNavigation(direction) {
        console.log('Handling answer');
        handleCheckAnswer();
        console.log('Answer handled');
        setMcClasses(null);
        props.setCurrentQuestion({
            index: direction === 'next' ? (currentQuestion.index + 1) % questions.length : (currentQuestion.index - 1) % questions.length,
            length: questions.length
        });
    }

    // Display the current question.
    if (currentQuestion.length > 0) {
        switch (questions[currentQuestion.index].type) {
            case 'mc': return (
                <>
                    <div className='questionContainer'>
                        <Questionheader questionNumber={currentQuestion.index + 1} />
                        <Questiontext question={questions[currentQuestion.index]} />
                        <AnswersMC
                            correct={questions[currentQuestion.index].correct}
                            incorrect={questions[currentQuestion.index].incorrect}
                            navigation={handleNavigation}
                            shuffleSeed={props.shuffleSeed}
                            active={!props.lockedQuestions[currentQuestion.index]}
                            classes={mcClasses}
                            newAnswer={newAnswer}
                            setNewAnswer={setNewAnswer}
                        />
                    </div>
                    <Quizbuttons
                        checkAnswer={handleCheckAnswer}
                        navigate={handleNavigation}
                        setQuizState={props.setQuizState}
                        currentQuestion={currentQuestion}
                    />
                </>

            );

            case 'ma': return (
            <>
                <div className='questionContainer'>
                    <Questionheader questionNumber={currentQuestion.index + 1} />
                    <Questiontext question={questions[currentQuestion.index]} />
                    <AnswersMA
                        correct={questions[currentQuestion.index].correct}
                        incorrect={questions[currentQuestion.index].incorrect}
                        navigation={handleNavigation}
                        shuffleSeed={props.shuffleSeed}
                        active={!props.lockedQuestions[currentQuestion.index]}
                        results={maResults}
                    />
                </div>
                <Quizbuttons
                    checkAnswer={handleCheckAnswer}
                    navigate={handleNavigation}
                    setQuizState={props.setQuizState}
                    currentQuestion={currentQuestion}
                />
            </>);

            default: return ('Fant ikke spørsmål.');
        }

    } else {
        return null;
    }

}

export default Questions;
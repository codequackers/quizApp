import { useState, useEffect } from "react";
import './App.css';
import Questions from './components/Questions';
import Results from './components/results/Results';

function App(props) {
  const startTime = props.startTime;

  const [questions, setQuestions] = useState(null);
  const [quizState, setQuizState] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({ index: 0, length: -1 });
  const [lockedQuestions, setLockedQuestions] = useState([]);
  const [score, setScore] = useState(0);

  //Fetch questions from server
  useEffect(() => {
    //Use this url for production build:
    const url = 'https://www.codequackers.no/OP3byXf6OptiTMlYslV3/questions.json';

    //Use this url for development:
    // Go to folder server and run npx serve to get this up and running.
    //const url = 'questions.json';

    const getQuestions = async () => {
      let res = await fetch(url);
      let data = await res.json();

      setQuestions(data[props.chapter]);
      setCurrentQuestion({ index: 0, length: data[props.chapter].length });
      setLockedQuestions((new Array(data[props.chapter].length).fill(false)));
    }
    getQuestions();

  }, [props.chapter]);

  // Based on the quiz state, return either the questions or the results.
  if (quizState) {
    return (
      <div className="App">
        <h1 className="MainHeader"><span>Quiz</span></h1>
        {<Questions
          questions={questions ? questions : null}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          shuffleSeed={props.shuffleSeed}
          setQuizState={setQuizState}
          lockedQuestions={lockedQuestions}
          setLockedQuestions={setLockedQuestions}
          score={score}
          setScore={setScore}
        />}

      </div>
    );
  } else {
    return (
      <Results
        maxScore={questions.length}
        finalScore={score}
        duration={Date.now()-startTime}
      />
    );
  }

}

export default App;
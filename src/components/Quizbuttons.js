function Quizbuttons(props) {
    
    let classes = 'myButton ';
    if(props.currentQuestion.index === props.currentQuestion.length - 1){
        classes += 'hide';
    }

    return(
        <div className='quizBtns'>
            <button onClick={props.checkAnswer} className='myButton'> Sjekk svar </button>
            <button onClick={()=>props.navigate('next')} className={classes}> Neste spørsmål </button>
            <button onClick={()=> {props.checkAnswer(); props.setQuizState(false);}} className='myButton'> Fullfør quiz </button>
        </div>
    )
}

export default Quizbuttons;
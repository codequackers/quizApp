function SummaryNav() {

    function handleRetakeTest(){
        window.location.href='index.html';
    }

    function handleNextChapter(){
        window.location.href='../index.html';
    }

    return (
        <div className='quizBtns'>
            <button className='myButton' onClick={handleRetakeTest}>TA TESTEN PÅ NYTT</button>
            <button className='myButton' onClick={handleNextChapter}>HJEM</button>
        </div>
       
    )
}

export default SummaryNav;
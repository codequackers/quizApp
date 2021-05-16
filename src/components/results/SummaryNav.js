function SummaryNav() {

    function retakeTest(){
        window.location.href='index.html';
    }

    return (
       <button className='myButton' onClick={retakeTest}>TA TESTEN PÅ NYTT</button> 
    )
}

export default SummaryNav;
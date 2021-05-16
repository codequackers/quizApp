import Summary from './Summary';
import SummaryNav from './SummaryNav';
import Points from './Points';
import Percentage from './Percentage';

function Results(props){

    const duration = props.duration;

    console.log('Final score: ');
    console.log(props.finalScore/props.maxScore);
    return(
        <div className='results'>
            <div className='summaryBox'>
                <Points score={props.finalScore} maxScore={props.maxScore}/>
                <Percentage score={props.finalScore} maxScore={props.maxScore}/>
                
            </div>
            <div className='summaryPane'>
                <Summary 
                    score={props.finalScore} 
                    maxScore={props.maxScore}
                    duration={duration}    
                />
                <SummaryNav />
            </div>
        </div>
        
    )
}

export default Results;
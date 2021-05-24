function Summary(props) {
    const duration = props.duration;
    
    let hoursDEC = duration / (1000 * 60 * 60);
    let hoursINT = Math.trunc(hoursDEC);

    let minutesDEC = (hoursDEC - hoursINT) * 60;
    let minutesINT = Math.trunc(minutesDEC);

    let secondsDEC = (minutesDEC - minutesINT) * 60;
    let secondsINT = Math.round(secondsDEC);

    let durationString;

    hoursINT > 0 ? durationString = `Tid brukt: ${hoursINT} timer, ${minutesINT} minutter, ${secondsINT} sekunder` : durationString = `Tid brukt: ${minutesINT} minutter, ${secondsINT} sekunder`;

    return (
        <div className='summary'>
            <h1>Quiz om variabler</h1>
            <div>
                <p className='resultTime'><span id='quizTimeSpent'>{durationString}</span></p>
                <p>Testen er fullført.</p>
                <p>Du kan enten ta den på nytt eller fortsette til neste kapittel.</p>
            </div>

        </div>

    )
}

export default Summary;
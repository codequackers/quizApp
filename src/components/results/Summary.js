function Summary(props) {
    const duration = props.duration;
    console.log(duration);

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
                <p className='resultFinal'>Du må ha et resultat på minimum 6 korrekte svar for å gå videre i kurset.</p>
                <p className='resultNext'>Ta testen på nytt nedefor.</p>
            </div>

        </div>

    )
}

export default Summary;
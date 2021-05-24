function Points(props) {

    // 1. Set number to fixed(1);
    let myScore = parseFloat(props.score.toFixed(1));

    // 2. Split in int and decimal
    let intPart = Math.trunc(myScore);
    let decimalPart = myScore - intPart;

    // 3. If decimalPart > 0, set fixin = 1, else fixin = 0
    let fixin = 0;
    decimalPart > 0 ? fixin = 1 : fixin = 0;

    return (
        <>
            <h1>RESULTAT</h1>
            <p className='totalScore'>{props.score.toFixed(fixin)}/{props.maxScore} poeng</p>
        </>
    )
}

export default Points;
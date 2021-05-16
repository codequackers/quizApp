function Points(props) {

    // Check to see if score has any decimals
    // Separate number in integer and decimal part
    let intPart = Math.trunc(props.score);
    let decimalPart = props.score - intPart;
    let fixin = 0;

    /* 
        We want rounding to at most 1 decimal point.
        The "deciding" decimal will then be at the 2 decimal place, 0.0x. 
        Consider a number a = 0.dxyz...
        => a*100 = dx.yz...
        => Math.trunc(a*100) = dx
        Then, if dx > 0, set toFixed(1) else set toFixed(0);
        Here a = decimalPart
    */

    if(Math.trunc(decimalPart*100) > 0){
        fixin = 1;
    } else {
        fixin = 0;
    }

    return (
        <>
            <h1>RESULTAT</h1>
            <p className='totalScore'>{props.score.toFixed(fixin)}/{props.maxScore} poeng</p>
        </>
    )
}

export default Points;
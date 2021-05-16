import { useRef, useEffect } from 'react';

function Percentage(props) {
    let score = (props.score/props.maxScore).toFixed(4);

    /*
        Kilde:
            https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
    */
    const canvasRef = useRef(null);

    const draw = ctx => {
        console.log('drawing')
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        let r = 70;
        // Background
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, r, 0, 2*Math.PI);
        ctx.fill();
        
        // Bar
        let line = 25;
        ctx.strokeStyle = '#1c9dd8';
        ctx.lineWidth = line;
        ctx.beginPath();
        ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, r-line/2, -Math.PI/2, -Math.PI/2+2*Math.PI*score);
        ctx.stroke();

        // Text
        ctx.fillStyle = '#1c9dd8';
        ctx.font = 'bold 20pt Montserrat';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(score*100+'%', ctx.canvas.width/2, ctx.canvas.height/2);
    }

    useEffect(()=>{

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    /* let f = new FontFace('Montserrat', 'url(https://fonts.googleapis.com/css2?family=Montserrat)');

    f.load().then((e)=>{
        console.log(e)
        draw(ctx);
    }); */

    draw(ctx);

    },[draw]);
    
    return (
        <>
            <canvas ref={canvasRef} width="200" height="200"/>
            {/* <span className='scorePercentage'>{score*100}</span> */}
       </>
    )
}

export default Percentage;
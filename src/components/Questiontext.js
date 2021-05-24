import reactStringReplace from 'react-string-replace';
/*
    https://www.npmjs.com/package/react-string-replace
*/

function Questiontext(props) {
    let question = props.question.question;
    let code = props.question.code;

    //Question info
    let questionInfo = '';
    switch (props.question.type){
        case 'mc':
            questionInfo = 'Velg ett svaralternativ.';
            break;
        case 'ma':
            questionInfo = 'Velg ett eller flere svaralternativ.';
            break;
        default: 
            questionInfo = 'Ukjent spørsmålstype';  
    }

    // Render code elements
    for(let i = 0; i < code.length; i++){
        const searchString = '$'+i
        question = reactStringReplace(question, searchString, (match) => (<code key={i}>{code[i]}</code>));
    }

    // Replace \n with <br> to get a linebreak.
    question = reactStringReplace(question, "\n", ()=><br key={Math.random()} />);
    // Replace \t with <br> to get a linebreak.
    question = reactStringReplace(question, "\t", ()=><span key={Math.random()}>&emsp;&emsp;&emsp;&emsp;&emsp;</span>);

    return (
        <div className='questiontext'>
        {question}
        <div className='questioninfo'>
            {questionInfo}
        </div>
        
        </div>
    )
}

export default Questiontext;
function Answers(props){
    console.log('Answers props:');
    console.log(props.type);
    
    
    switch (props.type) {
        case 'mc': return (
            <p>Multiple choice</p>
        )

        case 'ma': return (
            <p>Multiple answers</p>
        )
        default: return (
            <p>Answers</p>
        )
    }
}

export default Answers;
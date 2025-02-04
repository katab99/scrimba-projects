export default function Die(props){
    return(<button
        className={props.isHeld ? 'green-die' : 'white-die'}
        onClick={props.holdDie}
        aria-pressed={props.isHeld}
        aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}>
        {props.value}
    </button>)
}
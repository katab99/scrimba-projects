import {useState, useRef, useEffect} from "react";
import { nanoid } from "nanoid"
import Die from "./Die"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)

    const gameWon = (dice.every((die) => (die.isHeld) === true))
        && (dice.every((die) => (die.value === dice[0].value)))

    useEffect(() => {
        if(gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon]);

    function generateAllNewDice(){
        return new Array(10)
            .fill(0)
            .map(() => ({
                id: nanoid(),
                value : Math.ceil(Math.random() * 6),
                isHeld: false
            }));
    }

    const diceItems = dice.map(dice =>
        <Die
            key={dice.id}
            value={dice.value}
            isHeld={dice.isHeld}
            holdDie={() => hold(dice.id)}/>
    )

    function hold(id){
        setDice((oldDice) => (
                oldDice.map(die =>
                    die.id === id ? {...die, isHeld : !die.isHeld} : die
            )))
    }

    function rollDice(isGameWon){
        if(isGameWon){
            setDice(() => generateAllNewDice())
        }else{
            setDice(oldDice =>
                oldDice.map(die =>
                    (die.isHeld ? die : {...die, value : Math.ceil(Math.random() * 6)})
                ))
        }

    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className={"dice-container"}>
                {diceItems}
            </div>
            <button ref={buttonRef} className="roll-dice" onClick={() => rollDice(gameWon)}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}
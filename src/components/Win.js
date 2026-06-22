import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import GameComponent from '../components/Game';
import MenuComponent from '../components/Menu';

export default function Win({ level, cardType, moves }){
    const[screen, setScreen] = useState("win");
    const difficulty = {
        easy: "Easy",
        medium:"Medium",
        hard: "Hard"
    }
    return(
        <div>
            {screen === "win"&&(
                <section className='centered-section'>
                    <h1 className="title">Memory Bakery</h1>
                    <h2 className="text">You Win!</h2>
                    <h3 className="text">Completed Level: {difficulty[level]}</h3>
                    <h3 className="text">Moves: {moves}</h3>
                    <Button className= "btn-action" onClick = {()=>setScreen("game")}>Restart</Button>
                    <Button className= "btn-action" onClick = {()=>setScreen("menu")}>Home</Button>
                </section>
            )}
            {screen === "game"&&(
                <GameComponent level = {level} cardType={cardType}/>
            )}
            {screen === "menu"&&(
                <MenuComponent/>
            )}
        </div>
    );
}
import React, {useState, useEffect} from 'react';
import {Card, CardImg} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import WinComponent from '../components/Win';
import MenuComponent from '../components/Menu';
import cake1 from '../assets/cake1.png';
import cake2 from '../assets/cake2.png';
import cake3 from '../assets/cake3.png';
import cake4 from '../assets/cake4.png';
import cake5 from '../assets/cake5.png';
import cake6 from '../assets/cake6.png';
import cake7 from '../assets/cake7.png';
import cake8 from '../assets/cake8.png';
import bread1 from '../assets/bread1.png';
import bread2 from '../assets/bread2.png';
import bread3 from '../assets/bread3.png';
import bread4 from '../assets/bread4.png';
import bread5 from '../assets/bread5.png';
import bread6 from '../assets/bread6.png';
import bread7 from '../assets/bread7.png';
import bread8 from '../assets/bread8.png';
import donut1 from '../assets/donut1.png';
import donut2 from '../assets/donut2.png';
import donut3 from '../assets/donut3.png';
import donut4 from '../assets/donut4.png';
import donut5 from '../assets/donut5.png';
import donut6 from '../assets/donut6.png';
import donut7 from '../assets/donut7.png';
import donut8 from '../assets/donut8.png';
import '../style.css';

export default function Game({ level, cardType }){
    const [screen, setScreen] = useState("game");
    const [cardOne, setCardOne] = useState(null);
    const [cardTwo, setCardTwo] = useState(null);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);

    const dict = {
        "easy": {
            "rows": 2,
            "columns": 4,
            "cards": [1,1,2,2,3,3,4,4],
            "ids": [0,1,2,3,4,5,6,7],
            "win": 4
        },
        "medium": {
            "rows": 3,
            "columns": 4,
            "cards": [1,1,2,2,3,3,4,4,5,5,6,6],
            "ids": [0,1,2,3,4,5,6,7,8,9,10,11],
            "win": 6
        },
        "hard": {
            "rows": 4,
            "columns": 4,
            "cards": [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
            "ids": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            "win": 8
        },
        "cake": {
            "1": cake1,
            "2": cake2,
            "3": cake3,
            "4": cake4,
            "5": cake5,
            "6": cake6, 
            "7": cake7,
            "8": cake8,
        },
        "donuts":{
            "1": donut1,
            "2": donut2,
            "3": donut3,
            "4": donut4,
            "5": donut5,
            "6": donut6, 
            "7": donut7,
            "8": donut8,
        },
        "bread":{
            "1": bread1,
            "2": bread2,
            "3": bread3,
            "4": bread4,
            "5": bread5,
            "6": bread6, 
            "7": bread7,
            "8": bread8,
        }
    };

    const [cardsGrid, setCardsGrid] = useState([]);

    function NewGame(){
        setTimeout(()=>{
            const randomArray = FisherYatesShuffle(dict[level].cards);
            setCardsGrid(randomArray);
            setFlipped(Array(dict[level].cards.length).fill(false));
            setMatched(Array(dict[level].cards.length).fill(false));
            setMoves(0);
            setMatches(0);
            setCardOne(null);
            setCardTwo(null);
        }, 1000);
    }

    function selectCards(id){
        setMoves(prev => prev + 1);
        if (matched[id]){
            return;
        }

        if(!cardOne || !cardTwo){
            if (!cardOne) {
                setCardOne({
                    id,
                    value: cardsGrid[id]
                });
            } else if (!cardTwo && cardOne.id !== id) {
                setCardTwo({
                    id,
                    value: cardsGrid[id]
                });
            }
        }
    }

    function deselect(){
        setFlipped((prev => {
                        const copy = [...prev];
                        copy[cardOne.id] = false;
                        copy[cardTwo.id] = false;
                        return copy;
                    }));
        setCardOne(null);
        setCardTwo(null);
    }

    function FisherYatesShuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    useEffect(()=>{
        if(!cardOne || !cardTwo){
            return;
        }
        if (cardOne.value === cardTwo.value) {

            setMatched(prev => {
                const copy = [...prev];
                copy[cardOne.id] = true;
                copy[cardTwo.id] = true;
                return copy;
            });

            setMatches(prev => prev + 1);

            setCardOne(null);
            setCardTwo(null);
            deselect();
        }
        else{
            setTimeout(() => {
                deselect();
            }, 1000);
        }
    }, [cardOne, cardTwo]);

    useEffect(() => {
        NewGame();
    }, []);

    return(
        <div>
            {screen !== "menu"&&(
                <div>
                {matches !== dict[level].win ? (
                <section>
                <h1 className="title">Memory Bakery</h1>
                <Button className= "btn-action" onClick={() => setScreen("help")}>Help</Button>
                <Button className= "btn-action" onClick={() => setScreen("menu")}>Menu</Button>
                
                <p>Moves : {moves}</p>
                <section className={'board-'+level}>
                    {dict[level].ids.map(id=>(
                        <Card className='card-form'
                            item={cardsGrid[id]}
                            key={id}
                            onClick={() => {
                                if (matched[id]) {return};
                                setFlipped(prev => {
                                    const copy = [...prev];
                                    copy[id] = true;
                                    return copy;
                                });
                                selectCards(id);}
                            }
                            >
                            {(flipped[id] || matched[id]) ? (<img className = "square-img" src = {dict[cardType][cardsGrid[id]]} alt = {cardType} style={{
                                width: "200px", 
                                height: "auto", 
                            }}></img>) : ("")}
                        </Card>))
                    }
                </section>
            </section>
            ) : (
                <WinComponent level = {level} cardType = {cardType} moves = {moves}/>
            )}
            </div>
            )}
            {screen === "help"&&(
                <section className = "title">
                    <h2 className='title2'>Help</h2>
                    <p>How to play:</p>
                    <ol className= "text">
                        <li>Click a card to reveal the baked good</li>
                        <li>Click another card</li>
                        <li>Try to match the baked goods on both cards</li>
                        <li>Repeat clicking pairs until all cards are matched</li>
                    </ol>

                    <p>Please do not click on other cards while the two you have chosen do not match and have not returned to being blank.</p>
                    <p>If you do, please click "Menu" to restart.</p>

                    <p>Moves: counts how many cards clicked until the game is finished.</p>
                    <Button className= "btn-action" onClick = {()=>setScreen("game")}>Close</Button>
                </section>
            )}
            {screen === "menu"&&(
                <section>
                    <MenuComponent/>
                </section>
            )}
        </div>
    );

};
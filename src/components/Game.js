import React, {useState, useEffect} from 'react';
import {Card, CardImg} from 'react-bootstrap';
import cake1 from '../assets/cake1.png';
import cake2 from '../assets/cake2.png';
import cake3 from '../assets/cake3.png';
import cake4 from '../assets/cake4.png';
import cake5 from '../assets/cake5.png';
import cake6 from '../assets/cake6.png';
import cake7 from '../assets/cake7.png';
import cake8 from '../assets/cake8.png';
import '../style.css';

export default function Game({ level, cardType }){
    const [cardOne, setCardOne] = useState(null);
    const [cardTwo, setCardTwo] = useState(null);
    const [fliped, setFliped] = useState([]);
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
        }
    };

    const [cardsGrid, setCardsGrid] = useState([]);

    function NewGame(){
        setTimeout(()=>{
            const randomArray = FisherYatesShuffle(dict[level].cards);
            setCardsGrid(randomArray);
            setMatches(Array(dict[level].cards.length).fill(false));
            setMoves(0);
            setMatches(0);
            setCardOne(null);
            setCardTwo(null);
        }, 1000);
    }

    function selectCards(id){
        if(cardOne === null || cardOne[0] !== true){
            setCardOne(fliped[id],cardsGrid[id]);
        }
        else{
            setCardTwo(fliped[id],cardsGrid[id]);
        }
    }

    function deselect(){
        setCardOne(null);
        setCardTwo(null);
    }

    function FisherYatesShuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            console.log(j+" "+temp);
        }
        return array;
    }

    useEffect(()=>{
        if(cardOne && cardTwo){
            if(cardOne === cardTwo){
                matched[cardOne[1]] = true;
                setMatches(matches + 1);
                deselect();
            }
            else{
                deselect();
            }
        }
    })

    useEffect(() => {
        NewGame();
    }, []);

    return(
        <div>
            <h1>Memory Bakery</h1>
            <section className={'board-'+level}>
                {dict[level].ids.map(id=>(
                    <Card
                        item={cardsGrid[id]}
                        key={id}
                        onClick={() => fliped[id] = true, selectCards(id)}
                        >
                        {fliped[id] || matched[id] ? (<img className = "square-img" src = {dict[cardType][cardsGrid[id]]} alt = {cardType} style={{
                            width: "200px", 
                            height: "auto", 
                        }}></img>) : ("?")}
                    </Card>))
                }
            </section>
            {matches !== dict[level].win ? (
                <div>Moves : {moves}</div>
            ) : (
                <div>You Won in {moves} moves</div>
            )}
        </div>
    );

};
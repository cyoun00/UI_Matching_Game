import React, {useState, useEffect} from 'react';
import {Card, CardImg} from 'react-bootstrap';
import WinComponent from '../components/Win';
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
            {matches !== dict[level].win ? (
                <section>
                <h1>Memory Bakery</h1>
                <section className={'board-'+level}>
                    {dict[level].ids.map(id=>(
                        <Card
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
                            }}></img>) : ("?")}
                        </Card>))
                    }
                </section>
                <div>Moves : {moves}</div>
            </section>
            ) : (
                <WinComponent level = {level} cardType = {cardType} moves = {moves}/>
            )}
        </div>
    );

};
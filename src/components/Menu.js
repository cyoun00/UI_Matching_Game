import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GameComponent from '../components/Game';
import '../style.css';

export default function Menu(){
    const [game, setGame] = useState(false);
    const [level, setLevel] = useState(null);
    const [cards, setCards] = useState(null);

    return(
        <div>
        {game === false &&(
        <section>
          <h1>Memory Bakery</h1>
          <Form>
            <Form.Label>Choose your difficulty level:</Form.Label>
            <Form.Check
              inline
              label="Easy"
              name="difficulty"
              type="radio"
              id="inline-radio-1"
              onChange={(e) => setLevel("easy")}
            />
            <Form.Check
              inline
              label="Medium"
              name="difficulty"
              type="radio"
              id="inline-radio-2"
              onChange={(e) => setLevel("medium")}
            />
            <Form.Check
              inline
              label="Hard"
              name="difficulty"
              type="radio"
              id="inline-radio-3"
              onChange={(e) => setLevel("hard")}/>
            <Form.Label>Choose what to bake:</Form.Label>
            <Form.Check
              inline
              label="Cake"
              name="cardDeck"
              type="radio"
              id="inline-radio-4"
              onChange={(e) => setCards("cake")}
            />
            <Form.Check
              inline
              label="Donuts"
              name="cardDeck"
              type="radio"
              id="inline-radio-5"
              onChange={(e) => setCards("donuts")}
            />
            <Form.Check
              inline
              label="Bread"
              name="cardDeck"
              type="radio"
              id="inline-radio-6"
              onChange={(e) => setCards("bread")}/>

            <Button onClick={() => setGame(true)}>Start</Button>

          </Form>
          <p>{cards ? cards : "Null"}</p>
        </section>
      )}
      {game === true &&(
        <section>
          <GameComponent level = {level} cardType={cards}/>
        </section>
      )}
      </div>
    );
}
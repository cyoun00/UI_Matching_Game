import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GameComponent from './components/Game';
import './style.css';

function App() {
  const [consentgiven, setConsentgiven] = useState(false);
  const [screen, setScreen] = useState("menu");
  const [level, setLevel] = useState(null);
  const [cards, setCards] = useState(null);

  const handleChange = (e) => {
    setConsentgiven(true);
  };

  return (
    <div className="App">
      {consentgiven === false && (
        <section>
          <h1>Memory Bakery</h1>
          <p>You are 13 years old or older, or give parental consent to terms and conditions.</p>
          <Form>
            <Form.Check
              type= "checkbox"
              id= "I Agree"
              label= "I Agree"
              checked={consentgiven}
              onChange={handleChange}
            />
          </Form>
          <p>{consentgiven ? consentgiven : "Not Accepted"}</p>
        </section>
      )}
      {consentgiven === true && screen === "menu"&&(
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

            <Button onClick={() => setScreen("game")}>Start</Button>

          </Form>
          <p>{cards ? cards : "Null"}</p>
        </section>
      )}
      {consentgiven === true && screen === "game" &&(
        <section>
          <GameComponent level = {level} cardType={cards}/>
        </section>
      )}
    </div>
  );
}

export default App;

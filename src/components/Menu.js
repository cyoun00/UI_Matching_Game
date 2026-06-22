import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GameComponent from '../components/Game';
import '../style.css';
import BackgroundComponent from '../components/Background';

export default function Menu(){
    const [screen, setScreen] = useState("menu");
    const [level, setLevel] = useState(null);
    const [cards, setCards] = useState(null);

    return(
        <div>
        {screen === 'menu' &&(
        <div>
        <BackgroundComponent/>
        <section className='centered-section' style={{position: "relative", zIndex:2}}>
          <h1 className="title">Memory Bakery</h1>
          <Form>
            <Form.Label className='title2'>Choose your difficulty level:</Form.Label>
            <section className='radio-section'>
            <Form.Check className='text'
              inline
              label="Easy"
              name="difficulty"
              type="radio"
              id="inline-radio-1"
              onChange={(e) => setLevel("easy")}
            />
            <Form.Check className='text'
              inline
              label="Medium"
              name="difficulty"
              type="radio"
              id="inline-radio-2"
              onChange={(e) => setLevel("medium")}
            />
            <Form.Check className='text'
              inline
              label="Hard"
              name="difficulty"
              type="radio"
              id="inline-radio-3"
              onChange={(e) => setLevel("hard")}/>
            </section>
            <Form.Label className='title2'>Choose what to bake:</Form.Label>
            <section className='radio-section'>
            <Form.Check className='text'
              inline
              label="Cake"
              name="cardDeck"
              type="radio"
              id="inline-radio-4"
              onChange={(e) => setCards("cake")}
            />
            <Form.Check className='text'
              inline
              label="Donuts"
              name="cardDeck"
              type="radio"
              id="inline-radio-5"
              onChange={(e) => setCards("donuts")}
            />
            <Form.Check className='text'
              inline
              label="Bread"
              name="cardDeck"
              type="radio"
              id="inline-radio-6"
              onChange={(e) => setCards("bread")}/>
            </section>
            <Button className= "btn-action" type = "submit" disabled={!level || !cards} onClick={() => setScreen("game")}>Start</Button>
            <Button className="btn-benefit" onClick={() => setScreen("benefits")}>What are the benefits of this game?</Button>
          </Form>
        </section>
        </div>
      )}
      {screen === "game" &&(
        <section>
          <GameComponent level = {level} cardType={cards}/>
        </section>
      )}
      {screen === "benefits" &&(
        <section>
          <h1 className="title">Memory Bakery</h1>
            <h2 className="title2">Benefits</h2>
            <p>The benefits of the game are sharpening memory, keeping the brain active, and improving focus. Matching cards requires good memory and recall to keep track of unmatched baked goods after the cards have turned again.</p>

                <p>The audiences that this game can help are:</p>
                <ul className='text'>
                <li>Seniors: mental stimulation and maintains memory</li>
                <li>Students: improves focus and recall</li>
                <li>Kids: improves logic and cognition</li>
                </ul>

            <p>The number of matches made before winning can help create a score as an evaluation of your memory.</p>
            <Button className= "btn-action" onClick = {()=>setScreen("menu")}>Return to Menu</Button>
        </section>
      )}
      </div>
    );
}
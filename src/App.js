import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MenuComponent from './components/Menu';
import logo from './assets/bread8.png';
import './style.css';

function App() {
  const [consentgiven, setConsentgiven] = useState(false);

  const handleChange = (e) => {
    setConsentgiven(true);
  };

  return (
    <div>
      {consentgiven === false && (
        <section className="centered-section">
          <section className="title-section">
            <h1 className="title">Memory Bakery</h1>
            <img className='logo' src={logo} alt ="logo"></img>
          </section>
          <p>You are 13 years old or older, or give parental consent to terms and conditions.</p>
          <Form>
            <Form.Check className="text"
              type= "checkbox"
              id= "I Agree"
              label= "I Agree"
              checked={consentgiven}
              onChange={handleChange}
            />
          </Form>
        </section>
      )}
      {consentgiven === true &&(
        <MenuComponent/>
      )}
    </div>
  );
}

export default App;

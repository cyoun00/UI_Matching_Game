import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MenuComponent from './components/Menu';
import './style.css';

function App() {
  const [consentgiven, setConsentgiven] = useState(false);

  const handleChange = (e) => {
    setConsentgiven(true);
  };

  return (
    <div className="App">
      {consentgiven === false && (
        <section className="centered-section">
          <h1 className="title">Memory Bakery</h1>
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

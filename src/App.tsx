import React from 'react';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import { Advisors } from './components/advisors';
import './App.scss';
import { PitchForm } from './components/pitch';
function App() {

  return (
    <div className="App">
      <Container className="min-h-screen flex flex-col">
        <Advisors />
        <PitchForm />
      </Container>
    </div>
  );
}

export default App;

import React from 'react';
import Container from 'react-bootstrap/Container';
import { Advisors } from './components/advisors';
import './App.scss';
import { PitchForm } from './components/pitch';
import { ADVISORS } from './models/advisor';

function App() {

  return (
    <div className="App">
      <Container className="min-h-screen flex flex-col">
        <Advisors />
        <PitchForm advisors={ADVISORS} />
      </Container>
    </div>
  );
}

export default App;

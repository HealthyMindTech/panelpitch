import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { AdvisorSection } from './components/advisor_section';
import { UX, Market, Dev, Pitch } from './models/advisor';
import './App.scss';
import { PitchForm } from './components/pitch';
function App() {

  return (
    <div className="App">
      <Container className="min-h-screen flex flex-col">
        <Row>
          <Col xs={6}>
            <AdvisorSection advisor={UX} side='left' />
            <AdvisorSection advisor={Dev} side='left' />
          </Col>
          <Col xs={6}>
            <AdvisorSection advisor={Pitch} side='right' />
            <AdvisorSection advisor={Market} side='right' />
          </Col>
        </Row>
        <PitchForm />
      </Container>
    </div>
  );
}

export default App;

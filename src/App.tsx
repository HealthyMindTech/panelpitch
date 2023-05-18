import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AdvisorCard } from './components/advisor_card';
import { NarcissisticCEO } from './models/advisor';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={3}>
            <AdvisorCard advisor={NarcissisticCEO} />
            <AdvisorCard advisor={NarcissisticCEO} />
          </Col>
          <Col xs={6}>
            Hello
          </Col>
          <Col xs={3}>
            <AdvisorCard advisor={NarcissisticCEO} />
            <AdvisorCard advisor={NarcissisticCEO} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

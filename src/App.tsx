import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form } from 'react-bootstrap';
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
          <Form>
            <Form.Group className="mb-3" controlId="pitch">
              <Form.Label>Your pitch</Form.Label>
              <Form.Control as="textarea" rows={20} />
            </Form.Group>
            </Form>
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

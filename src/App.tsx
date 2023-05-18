import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Form } from 'react-bootstrap';
import { AdvisorCard } from './components/advisor_card';
import { AdvisorSection } from './components/advisor_section';
import { NarcissisticCEO } from './models/advisor';
import './App.scss';

function App() {
  const [pitch, setPitch] = React.useState<string>("");

  const handlePitchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPitch(event.target.value);
  };

  return (
    <div className="App">
      <Container className="min-h-screen flex flex-col">
        <Row>
          <Col xs={6}>
            <AdvisorSection advisor={NarcissisticCEO} side='left' />
            <AdvisorSection advisor={NarcissisticCEO} side='left' />
          </Col>
          <Col xs={6}>
            <AdvisorSection advisor={NarcissisticCEO} side='right' />
            <AdvisorSection advisor={NarcissisticCEO} side='right' />
          </Col>
        </Row>
        <Form className="b-0 flex-grow">
          <Form.Group className="mb-3 relative" controlId="pitch">
            {/* <Form.Label>Your pitch</Form.Label> */}
            <div className="flex justify-center h-80 items-center">
              {/* Hide when there is a pitch value */}
              {pitch === "" && (
                <div className="">
                  Start typing your pitch here!
                </div>
                )}
            </div>
            <Form.Control as="textarea" rows={10} className="absolute top-0 bg-transparent" 
              value={pitch} onChange={handlePitchChange}
            />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default App;

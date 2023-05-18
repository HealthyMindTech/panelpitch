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
        <Form className="b-0 flex-grow border-x border-y border-gray-300 rounded-2xl p-2 px-4">
          <Form.Group className="mb-3 relative" controlId="pitch">
            <Form.Control as="textarea" rows={10} className="" 
                value={pitch} onChange={handlePitchChange}
              />
            <div className="flex justify-center h-60 items-center absolute top-0 w-100 pointer-events-none">
              {/* Hide when there is a pitch value */}
              {pitch === "" && (
                <div className="">
                  Start typing your pitch here!
                </div>
                )}
            </div>
            
          </Form.Group>
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 rounded-xl text-white p-2 pt-0"><span className="material-symbols-outlined relative top-1.5 mr-1">send</span>Submit</button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default App;

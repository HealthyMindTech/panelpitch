import React from 'react';
import Container from 'react-bootstrap/Container';
import { Advisors } from './components/advisors';
import { PitchForm } from './components/pitch';
import { ADVISORS, AdvisorStatus } from './models/advisor';
import './App.scss';
import { Button, Modal } from 'react-bootstrap';

const INITIAL_ADVISOR_STATUS: Record<string, AdvisorStatus> = Object.fromEntries(ADVISORS.map<[string, AdvisorStatus]>((advisor) => {
  return [advisor.id, {
    status: 'ready',
    advisorId: advisor.id,
    message: `Hi, I'm ${advisor.name}! How can I help you?`,
  }]
}));

function ProjectInfoModal(props: { show: boolean, onHide: () => void }) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Project Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is a hackathon project!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [advisorStatus, setAdvisorStatus] = React.useState<Record<string, AdvisorStatus>>(INITIAL_ADVISOR_STATUS);
  const [showProjectInfoModal, setShowProjectInfoModal] = React.useState(false);

  return (
    <div className="App">
      <div className="flex w-full h-1">
        <div className="w-1/4" style={{background: "#0a8dde"}}></div>
        <div className="w-1/4" style={{background: "#e80f08"}}></div>
        <div className="w-1/4" style={{background: "#16cf70"}}></div>
        <div className="w-1/4" style={{background: "#dfb304"}}></div>
      </div>
      <Container className="min-h-screen flex flex-col">
        <div className="bg-white text-black p-2 pt-1.5 flex justify-between items-center">
          <div className="text-4xl text-center justify-center w-full">
            PanelPit.ch 
            <span className="font-semibold text-sm ml-3">
            HACKATHON ADVISORY BOARD
            </span>
            
          </div>
          <Button variant="secondary" size="sm" className="text-sm rounded-circle" onClick={() => setShowProjectInfoModal(true)}>?</Button>
        </div>
        <Advisors advisorStatus={advisorStatus} />
        <PitchForm advisors={ADVISORS} setAdvisorStatus={setAdvisorStatus} />
        <ProjectInfoModal show={showProjectInfoModal} onHide={() => setShowProjectInfoModal(false)} />
      </Container>
    </div>
  );
}

export default App;

import React from 'react';
import Container from 'react-bootstrap/Container';
import { Advisors } from './components/advisors';
import { PitchForm } from './components/pitch';
import { ADVISORS, AdvisorStatus } from './models/advisor';
import './App.scss';
import { Button, Modal } from 'react-bootstrap';

const INFO_MESSAGES = [
  "Enter your pitch below, and we'll give you inmediate, actionable feedback.",
  "We are a group of experts in different domains, and want to help you bring your next big idea to life!",
  "We're looking forward to seeing your pitch!",
  "We'll look at your pitch from different angles: business, technical, design and overall pitch.",
];

const INITIAL_ADVISOR_STATUS: Record<string, AdvisorStatus> = Object.fromEntries(ADVISORS.map<[string, AdvisorStatus]>((advisor, index) => {
  return [advisor.id, {
    status: 'ready',
    advisorId: advisor.id,
    message: `Hi, I'm ${advisor.name}! ${INFO_MESSAGES[index]}`,
  }]
}));

function ProjectInfoModal(props: { show: boolean, onHide: () => void }) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Project Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>How it works:</b><br/><br/>
        <ol>
            <li>1. Start by submitting your pitch text. Type in or copy in the text, and click on 'Pitch to advisors.'</li> 
            <li>2. Get immediate reviews of the pitch from different experts, providing perspectives from different areas but all important for the success of the pitch</li> 
            <li>3. You can ask for more in-depth analysis with one or more of the experts. Use the 'Ask to chat' buttons. You can choose to chat directly with one or more advisors at the same time. </li> 
            <li>4. Based on the feedback, you can resubmit your pitch as many times you want, so that you can perfect your pitch before you submit to the competition. </li>  
            </ol>
        </p>
        <p><b>Data notice:</b> We use OpenAI for the expert input. The data you submit will be sent to OpenAI for analysis. By using this service, you agree with the OpenAI data usage policy.
        </p>
        <p><b>About:</b> This project was created as part of the CraftHub 2023 hackathon.
        </p>
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
  const [globalPitch, setGlobalPitch] = React.useState<string>('');

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
          <Button style={{width: '28px'}} variant="secondary" size="sm" className="text-sm rounded-circle" onClick={() => setShowProjectInfoModal(true)}>?</Button>
        </div>
        <Advisors pitch={globalPitch} advisorStatus={advisorStatus} />
        <PitchForm advisors={ADVISORS} setGlobalPitch={setGlobalPitch} setAdvisorStatus={setAdvisorStatus} />
        <ProjectInfoModal show={showProjectInfoModal} onHide={() => setShowProjectInfoModal(false)} />
      </Container>
    </div>
  );
}

export default App;

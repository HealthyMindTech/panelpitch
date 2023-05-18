import React from 'react';
import Container from 'react-bootstrap/Container';
import { Advisors } from './components/advisors';
import { PitchForm } from './components/pitch';
import { ADVISORS, AdvisorStatus } from './models/advisor';
import './App.scss';
import { Button } from 'react-bootstrap';

const INITIAL_ADVISOR_STATUS: Record<string, AdvisorStatus> = Object.fromEntries(ADVISORS.map<[string, AdvisorStatus]>((advisor) => {
  return [advisor.id, {
    status: 'ready',
    advisorId: advisor.id,
    message: `Hi, I'm ${advisor.name}! How can I help you?`,
  }]
}));

function App() {
  const [advisorStatus, setAdvisorStatus] = React.useState<Record<string, AdvisorStatus>>(INITIAL_ADVISOR_STATUS);

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
          <Button variant="primary" size="sm" className="text-sm">info</Button>
        </div>
        <Advisors advisorStatus={advisorStatus} />
        <PitchForm advisors={ADVISORS} setAdvisorStatus={setAdvisorStatus} />
      </Container>
    </div>
  );
}

export default App;

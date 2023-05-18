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
      <Container className="min-h-screen flex flex-col">
        <div className="bg-white text-black p-2 flex justify-between items-center">
          <div className="text-lg font-bold justify-center text-center justify-center w-full">HACKATHON ADVISORY BOARD</div>
          <Button variant="primary" size="sm" className="text-sm">info</Button>
        </div>
        <Advisors advisorStatus={advisorStatus} />
        <PitchForm advisors={ADVISORS} setAdvisorStatus={setAdvisorStatus} />
      </Container>
    </div>
  );
}

export default App;

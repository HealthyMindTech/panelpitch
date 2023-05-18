import React from 'react';
import Container from 'react-bootstrap/Container';
import { Advisors } from './components/advisors';
import { PitchForm } from './components/pitch';
import { ADVISORS, AdvisorStatus } from './models/advisor';
import './App.scss';

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
        <Advisors advisorStatus={advisorStatus} />
        <PitchForm advisors={ADVISORS} setAdvisorStatus={setAdvisorStatus} />
      </Container>
    </div>
  );
}

export default App;

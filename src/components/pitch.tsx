import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { Advisor, AdvisorStatus } from '../models/advisor';
import { queryAdvisors } from '../services/openai';

type SetAdvisorStatusType = React.Dispatch<React.SetStateAction<Record<string, AdvisorStatus>>>;

const PitchForm = ({advisors, setAdvisorStatus}: { advisors: Array<Advisor>, setAdvisorStatus: SetAdvisorStatusType }): JSX.Element => {
    const [pitch, setPitch] = React.useState<string>("");

    const handlePitchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPitch(event.target.value);
    };

    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pitch === "") {
            return;
        }

        const handleAdvisor = (advisor: Advisor, response: string) => {
            setAdvisorStatus((prevAdvisorStatus) => {
                const newAdvisorStatus: Record<string, AdvisorStatus> = {};
                for (const currentAdvisor of advisors) {
                    newAdvisorStatus[currentAdvisor.id] = {
                        status: 'ready',
                        advisorId: currentAdvisor.id,
                        message: currentAdvisor.id === advisor.id ? response : prevAdvisorStatus[currentAdvisor.id].message,
                    };
                }
                return newAdvisorStatus;
            });
        };

        setAdvisorStatus(
            (prevAdvisorStatus) => {
                const newAdvisorStatus: Record<string, AdvisorStatus> = {};
                for (const advisor of advisors) {
                    newAdvisorStatus[advisor.id] = {
                        status: 'loading',
                        advisorId: advisor.id,
                        message: prevAdvisorStatus[advisor.id].message,
                    };
                }
                return newAdvisorStatus;
        });


        queryAdvisors(advisors, pitch, handleAdvisor);
        
    }, [pitch, advisors, setAdvisorStatus]);
    

    return (
    <Form className="text-right b-0 flex-grow border-x border-y border-gray-300 rounded-2xl p-2 px-4 mt-2 mb-4" onSubmit={onSubmit}>
        <Form.Group className="mb-3 relative" controlId="pitch">
            <Form.Control as="textarea" rows={10} autoFocus className="rounded-2xl"
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
        <Button variant="primary" type="submit">
            Pitch to advisors
      </Button>
    </Form>);
}

export { PitchForm };
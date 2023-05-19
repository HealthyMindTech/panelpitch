import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { Advisor, AdvisorStatus } from '../models/advisor';
import { queryAdvisors } from '../services/openai';

const examplePitch = `
Imagine this: You awake on a lazy Sunday morning, yearning for a perfectly boiled egg to complete your breakfast. But why settle for a simple and mundane process when you can turn your morning into a whimsical adventure? Let me introduce you to the Incredible Eggonator, an extraordinary Rube Goldberg machine that perfectly embodies the fusion of fun, science, and breakfast!

Our innovative contraption starts with the crowing of a mechanical rooster, which pushes a small, delicate egg from a nest onto a series of carefully balanced spoons, triggering a mesmerizing cascading effect. This rouses a mini 'hen' robot which begins to cluck and move, pulling a string that sets off a line of dominoes.

The last domino falls onto a lever that propels a tiny figure of a farmer. The farmer on his toy tractor chugs down a meandering track, hitting a switch that causes a small windmill to start turning. This windmill churns a gear system which slowly pulls a kettle filled with water up a mini pulley system.

Simultaneously, the tractor hits another switch to activate a tiny, safe induction heater. As the kettle reaches its peak on the pulley system, it tips over, and the water cascades down a miniature waterfall, landing directly onto the induction heater. The water boils swiftly on this efficient heating element, and it then travels through a system of heat-proof tubes.

Meanwhile, the egg, which was carefully transferred by the spoons into a small basket, gets lifted by a balloon released by the farmer's tractor hitting another switch. The egg in the basket gently floats down a guide wire towards its destination.

As the boiled water is ready, it is directed to a small, enclosed cooking chamber just in time for the arrival of the egg. The boiled water and egg meet in the chamber for the precise amount of time needed to achieve your preferred level of egg doneness, which is timed by a sand timer activated by the balloon's departure.

As the sand timer runs out, it triggers a soft bell sound and the release of the cooking chamber's door. The perfectly boiled egg rolls down a ramp, onto a mini elevator platform. The platform rises, revealing your deliciously cooked egg in a spotlight, ready to be devoured, atop a whimsical throne.

The Incredible Eggonator isn't just an egg boiler. It's a spectacle, a theatrical performance, and a great conversation starter, sure to inject a dose of whimsy and fun into your mornings. It might not be the quickest way to boil an egg, but it is undoubtedly the most entertaining way!

Remember, with the Incredible Eggonator, breakfast is no longer just a meal - it's a show!
`;

type SetAdvisorStatusType = React.Dispatch<React.SetStateAction<Record<string, AdvisorStatus>>>;
type SetGlobalPitchType = React.Dispatch<React.SetStateAction<string>>;
const PitchForm = ({advisors, setAdvisorStatus, setGlobalPitch }: { advisors: Array<Advisor>, setAdvisorStatus: SetAdvisorStatusType, setGlobalPitch: SetGlobalPitchType}): JSX.Element => {
    const [pitch, setPitch] = React.useState<string>("");

    const handlePitchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPitch(event.target.value);
    };

    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pitch === "") {
            return;
        }

        setGlobalPitch(pitch);

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
                        message: "I'm thinking....",
                    };
                }
                return newAdvisorStatus;
        });


        queryAdvisors(advisors, pitch, handleAdvisor);
        
    }, [pitch, advisors, setAdvisorStatus, setGlobalPitch]);
    

    const tryAnExample = () => {
        if (pitch === "") {
            setPitch(examplePitch);
        }
    }

    return (
        
    <Form className="text-right b-0 flex-grow mt-2 mb-4" onSubmit={onSubmit}>
        
        <Form.Group className="mb-1.5 relative" controlId="pitch">
            
            <Form.Control as="textarea" rows={10} autoFocus className="rounded-2xl"
                value={pitch} onChange={handlePitchChange}
            />
            <div className="flex justify-center h-60 items-center absolute top-0 w-100 pointer-events-none">
                {/* Hide when there is a pitch value */}
                <div className={`flex flex-col items-center transition-opacity ${pitch !== "" ? 'opacity-0' : ''}`}>
                    <img src="pitcher.png" style={{height: '100px', width: '100px'}} alt=""></img>
                    <div>Start typing your pitch here!</div>
                </div>
            </div>
        </Form.Group>
        <Button variant="secondary"  disabled={pitch !== ""} style={{float: "left"}} onClick={tryAnExample}>Enter example pitch</Button>
        <Button variant="primary" type="submit">
            Pitch to advisors
      </Button>
    </Form>);
}

export { PitchForm };
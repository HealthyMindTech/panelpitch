import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { Advisor } from '../models/advisor';
import { queryAdvisors } from '../services/openai';

const PitchForm = ({advisors}: { advisors: Array<Advisor>}): JSX.Element => {
    const [pitch, setPitch] = React.useState<string>("");

    const handlePitchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPitch(event.target.value);
    };

    const onSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
        console.log("Hello");
        event.preventDefault();
        if (pitch === "") {
            return;
        }

        queryAdvisors(advisors, pitch).then((response) => {
            console.log(response);
        });
    }, [pitch, advisors]);

    return (
    <Form className="text-right b-0 flex-grow border-x border-y border-gray-300 rounded-2xl p-2 px-4" onSubmit={onSubmit}>
        <Form.Group className="mb-3 relative" controlId="pitch">
            <Form.Control as="textarea" rows={10} autoFocus className=""
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

export { PitchForm }
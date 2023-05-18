import { Form } from 'react-bootstrap';
import React from 'react';

const PitchForm: () => JSX.Element = () => {
    const [pitch, setPitch] = React.useState<string>("");

    const handlePitchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPitch(event.target.value);
    };

    return (<Form className="b-0 flex-grow border-x border-y border-gray-300 rounded-2xl p-2 px-4">
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
    </Form>);
}

export { PitchForm }
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Advisor } from '../models/advisor';

const AdvisorSpeechBubble = ({text} : { text: string}) : JSX.Element => {
    return (
        <div className="border-x border-y rounded-2xl border-gray-300 mx-2 p-2">
            {text}
        </div>
    );
}

export { AdvisorSpeechBubble }
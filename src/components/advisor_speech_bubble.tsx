import './advisor_speech_bubble.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Advisor } from '../models/advisor';

const AdvisorSpeechBubble = ({text, expanded} : { text: string, expanded: boolean}) : JSX.Element => {
    const className = expanded ? "expanded" : "";

    return (
        <div
            className={`border-x border-y rounded-2xl border-gray-300 mx-2 p-2 AdvisorSpeechBubble ${className}`}
        >
            {text}
        </div>
    );
}

export { AdvisorSpeechBubble }
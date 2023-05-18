import React from 'react';
import { AdvisorCard } from './advisor_card';
import { AdvisorSpeechBubble } from './advisor_speech_bubble';
import { Advisor } from '../models/advisor';

const AdvisorSection = ({advisor, side} : { advisor: Advisor, side: 'left' | 'right'}) : JSX.Element => {
    return (
        <div className="flex max-h-40 m-2 mb-4">
            {side === 'right' && (
                <AdvisorSpeechBubble text={advisor.initialPrompt}/>
            )}
            <AdvisorCard advisor={advisor}/>
            {side === 'left' && (
                <AdvisorSpeechBubble text={advisor.initialPrompt}/>
            )}
        </div>
    );
}

export { AdvisorSection }
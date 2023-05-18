import React from 'react';
import { AdvisorCard } from './advisor_card';
import { AdvisorSpeechBubble } from './advisor_speech_bubble';
import { Advisor } from '../models/advisor';

const AdvisorSection = ({advisor, side} : { advisor: Advisor, side: 'left' | 'right'}) : JSX.Element => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    return (
        <div className="flex max-h-40 m-2 mb-4">
            {side === 'right' && (
                <AdvisorSpeechBubble text={advisor.initialPrompt} expanded={expanded}/>
            )}
            <AdvisorCard advisor={advisor} side={side} onChatClick={()=>{setExpanded(!expanded)}}/>
            {side === 'left' && (
                <AdvisorSpeechBubble text={advisor.initialPrompt} expanded={expanded}/>
            )}
        </div>
    );
}

export { AdvisorSection }
import './advisor_speech_bubble.css';
import { Chat } from './chat';
import { Advisor } from '../models/advisor';


interface AdvisorSpeechBubbleProps {
    text: string;
    expanded: boolean;
    closeChat: () => void;
    chatParticipants: Advisor[];
}

const AdvisorSpeechBubble = ({ text, expanded, closeChat, chatParticipants }: AdvisorSpeechBubbleProps): JSX.Element => {
    return (
        <div className="h-full" style={{maxHeight: '370px'}}>
            <div
                className={`border-x border-y rounded-2xl border-gray-300 bg-white mx-2 p-2 AdvisorSpeechBubble h-full z-20`}
            >   
                {expanded}
                {!expanded && text}
                {expanded && <Chat chatParticipants={chatParticipants} />}
            </div>
        </div>
    );
}

export { AdvisorSpeechBubble };
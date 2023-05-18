import './advisor_speech_bubble.css';
import { Chat } from './chat';
import { Advisor, ChatMessage } from '../models/advisor';
import Spinner from 'react-bootstrap/Spinner';

interface AdvisorSpeechBubbleProps {
    text: string;
    expanded: boolean;
    closeChat: () => void;
    chatParticipants: Advisor[];
    chatMessages: ChatMessage[];
    status: 'ready' | 'loading' | 'error';
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    pitch: string

}

const expandedText = (text: string, status: 'ready' | 'loading' | 'error'): JSX.Element => {
    if (status === 'loading') {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }
    return <>{text}</>;
}
const AdvisorSpeechBubble = ({ status, text, expanded, pitch, closeChat, chatParticipants, chatMessages, setChatMessages }: AdvisorSpeechBubbleProps): JSX.Element => {
    return (
        <div className="h-full" style={{maxHeight: expanded ? '370px' : '197px'}}>
            <div
                className={`border-x border-y rounded-2xl border-gray-300 bg-white mx-2 p-2 AdvisorSpeechBubble h-full z-20 ${!expanded && 'overflow-y-auto'}`}
            >   
                {expanded}
                {!expanded && expandedText(text, status)}
                {expanded && <Chat pitch={pitch} chatMessages={chatMessages} setChatMessages={setChatMessages} chatParticipants={chatParticipants} />}
            </div>
        </div>
    );
}

export { AdvisorSpeechBubble };
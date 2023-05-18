import './advisor_speech_bubble.css';
import { Chat } from './chat';


interface AdvisorSpeechBubbleProps {
    text: string;
    expanded: boolean;
    closeChat: () => void;
}

const AdvisorSpeechBubble = ({ text, expanded, closeChat }: AdvisorSpeechBubbleProps): JSX.Element => {
    const className = expanded ? "expanded" : "";

    return (
        <div>
            {expanded && (
                <div
                    onClick={closeChat}
                    className="bg-black opacity-10 fixed h-screen w-screen top-0 left-0 z-10"
                ></div>
            )}

            <div
                className={`border-x border-y rounded-2xl border-gray-300 bg-white mx-2 p-2 AdvisorSpeechBubble ${className} z-20`}
            >
                {!expanded && text}
                {expanded && <Chat />}
            </div>
        </div>
    );
}

export { AdvisorSpeechBubble };
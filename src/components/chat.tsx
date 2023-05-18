import { useRef, useEffect } from 'react';
import { Advisor, NarcissisticCEO } from '../models/advisor';

const testMessages = [
    {
        text: "Hello, I'm an advisor!",
        user: NarcissisticCEO,
    },
    {
        text: "Hello, I'm the user!",
        user: null,
    },
    {
        text: "Here's another message from the advisor!",
        user: NarcissisticCEO,
    },
    {
        text: "Here's another message from the user!",
        user: null,
    },
    {
        text: "Here's another message from the advisor!",
        user: NarcissisticCEO,
    },
    {
        text: "Here's another message from the user!",
        user: null,
    },
    {
        text: "Here's another message from the advisor!",
        user: NarcissisticCEO,
    },
    {
        text: "Here's another message from the user!",
        user: null,
    },
    {
        text: "Here's another message from the advisor!",
        user: NarcissisticCEO,
    },
    {
        text: "Here's another message from the user!",
        user: null,
    },
    {
        text: "Here's another message from the advisor!",
        user: NarcissisticCEO,
    },
    {
        text: "Here's another message from the user!",
        user: null,
    }
]



const Chat = ({ chatParticipants } : { chatParticipants: Advisor[] }): JSX.Element => {
    const chatRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className="w-100 flex flex-col h-full space-y-4 px-2 pb-2">
            <div className="flex justify-center">
                <div className="font-semibold mr-1">Chat with experts: </div>
                <div>
                    {chatParticipants.map(advisor => advisor.name).join(", ") + "."}

                </div>
            </div>
            {/* Chat messages area */}
            {/* If its from the advisors, put on left, if its user, right. */}
            <div className="flex justify-center w-100 flex-grow overflow-y-auto">
                <div className="bg-gray-100 rounded-xl p-2 px-4 w-100 overflow-y-auto h-full border-x border-y border-gray-300">
                    {testMessages.map((message, index) => {
                        if (message.user === null) {
                            return (
                                <div className="flex justify-end mb-2" key={message.text + index}>
                                    <div className="bg-blue-500 rounded-xl text-white p-2 px-4">
                                        {message.text}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex justify-start mb-2" key={message.text + index}>
                                    <div className="flex flex-col justify-center items-center mr-2">
                                        <img src={message.user.imageUrl} alt={message.user.name} className="rounded-full w-10 h-10" />
                                        <div className="text-xs align-center font-semibold" >{message.user.name}</div>
                                    </div>
                                    <div className="bg-gray-200 rounded-xl p-2 px-4">
                                        {message.text}
                                    </div>
                                </div>
                            );
                        }
                    })}
                    <div style={{ float:"left", clear: "both" }}
                        ref={chatRef}>
                    </div>
                </div>
            </div>
            {/* Chat input area */}
            <div className="flex justify-center w-100">
                <div className="w-100 mt-2">
                    <div className="flex justify-between border-x border-y border-gray-300 rounded-xl overflow-clip">
                        <input type="text" className="w-full p-2 px-4" autoFocus />
                        <button className="bg-blue-500 text-white p-2 pt-0"><span className="material-symbols-outlined relative top-1.5 mr-1">send</span>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Chat }
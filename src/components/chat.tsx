import { useRef, useEffect } from 'react';
import { ChatMessage, Advisor, USER_ID, ADVISOR_MAP } from '../models/advisor';
import { chatQuery } from '../services/openai';

interface ChatArgs {
    setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>, 
    chatParticipants: Advisor[], 
    chatMessages: ChatMessage[],
    pitch: string
}

const Chat = ({ chatParticipants, chatMessages, setChatMessages, pitch } : ChatArgs): JSX.Element => {
    const chatRef = useRef<HTMLDivElement>(null);
    const chatMessageRef = useRef<HTMLInputElement>(null);
    
    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    useEffect(() => {
        console.log(chatMessages);
        if (chatMessages.length === 0) {
            return;
        } else if (chatMessages[chatMessages.length - 1].advisorId !== USER_ID) {
            return;
        }

        console.log("Hello")
        chatQuery(chatParticipants, pitch, chatMessages, pitch).then((response) => {
            setChatMessages((prevMessages) => {
                return [...prevMessages, response];
            });
        });
    }, [chatMessages, chatParticipants, pitch, setChatMessages]);

    const submitChatMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const message = chatMessageRef.current?.value;
        if (message === undefined || message === null || message === "") { 
            return;
        }
        chatMessageRef.current!.value = "";

        setChatMessages((prevMessages) => {
            return [...prevMessages, {
                advisorId: USER_ID,
                message: message
            }];
        });
    }   
    
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
                    {chatMessages.map((message, index) => {
                        if (message.advisorId === USER_ID) {
                            return (
                                <div className="flex justify-end mb-2" key={index}>
                                    <div className="bg-blue-500 rounded-xl text-white p-2 px-4">
                                        {message.message}
                                    </div>
                                </div>
                            );
                        } else {
                            const advisor = ADVISOR_MAP[message.advisorId];
                            return (
                                <div className="flex justify-start mb-2" key={index}>
                                    <div className="flex flex-col justify-center items-center mr-2">
                                        <img src={advisor.imageUrl} alt={advisor.name} className="rounded-full w-10 h-10" />
                                        <div className="text-xs align-center font-semibold" >{advisor.name}</div>
                                    </div>
                                    <div className="bg-gray-200 rounded-xl p-2 px-4">
                                        {message.message}
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
                    <form onSubmit={submitChatMessage} className="flex justify-between border-x border-y border-gray-300 rounded-xl overflow-clip">
                        <input type="text" className="w-full p-2 px-4" ref={chatMessageRef} autoFocus/>
                        <button type="submit"
                                className="bg-blue-500 text-white p-2 pt-0">
                                    <span className="material-symbols-outlined relative top-1.5 mr-1">send</span>
                                    Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { Chat }
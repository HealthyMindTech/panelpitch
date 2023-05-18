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
    return (
        <div className="w-100 flex flex-col h-full">
            <div className="flex justify-center">
                <div className="font-semibold">Chat title</div>
                <div>
                    Participant names:
                    {chatParticipants.map((participant) => {
                        return (
                            <span>{participant.name}</span>
                        );
                    })}

                </div>
            </div>
            {/* Chat messages area */}
            {/* If its from the advisors, put on left, if its user, right. */}
            <div className="flex justify-center w-100 flex-grow overflow-y-auto">
                <div className="bg-gray-100 rounded-xl p-2 px-4 w-100 overflow-y-auto h-full">
                    {testMessages.map((message) => {
                        if (message.user === null) {
                            return (
                                <div className="flex justify-end">
                                    <div className="bg-blue-500 rounded-xl text-white p-2 px-4">
                                        {message.text}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 rounded-xl p-2 px-4">
                                        {message.text}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            {/* Chat input area */}
            <div className="flex justify-center w-100">
                <div className="bg-gray-100 rounded-xl p-2 px-4 w-100 mt-2">
                    <div className="flex justify-between">
                        <input type="text" className="w-full rounded-xl p-2 px-4" />
                        <button className="bg-blue-500 rounded-xl text-white p-2 pt-0"><span className="material-symbols-outlined relative top-1.5 mr-1">send</span>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Chat }
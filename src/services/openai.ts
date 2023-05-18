import { ADVISORS, ADVISOR_MAP, Advisor, ChatMessage, USER_ID } from "../models/advisor";

const OPENAI_SERVICE = "https://xzvf4ed573.execute-api.us-east-1.amazonaws.com/prod/completion"

async function queryOpenAI(prompt: string, stopWords?: Array<string>): Promise<string> {
    let append = "";
    if (stopWords) {
        append += stopWords.map(word => `stop=${encodeURIComponent(word)}`).join("&")
    }
    return fetch(OPENAI_SERVICE + "?temperature=1.2&max_tokens=2048&prompt=" + encodeURIComponent(prompt) + append)
        .then(response => response.json())
        .then(data => data.choices[0].text);
}

async function queryAdvisor(advisor: Advisor, pitch: string): Promise<string> {
    const prompt = `${advisor.introductionForPitchJudgement}. ${advisor.initialPrompt}.\n\n
    As an advisor you are advised to give your advice on the following pitch:\n${pitch}\n\nPlease write your brief advice, as though you were, ${advisor.description} here:\n`;

    return queryOpenAI(prompt);
}

function queryAdvisors(advisors: Array<Advisor>, prompt: string, handleAdvisor: (advisor: Advisor, response: string) => void): void {
    advisors.map(advisor => {
        const promise = queryAdvisor(advisor, prompt);
        return promise.then(response => handleAdvisor(advisor, response));
    });
}

function chatQuery(activeAdvisors: Array<Advisor>, pitch: string, charTilNow: Array<ChatMessage>, selectedAdvisorId?: string): Promise<string> {
    if (activeAdvisors.length === 0) {
        activeAdvisors = ADVISORS;
    }
    const prompt = chatPrompt(activeAdvisors, pitch, charTilNow, selectedAdvisorId);
    const stopWords = ADVISORS.map(advisor => "[${advisor.description]");
    return queryOpenAI(prompt, ["[USER]", "[SYSTEM]", ...stopWords]);
}

function chatPrompt(activeAdvisors: Array<Advisor>, pitch: string, chatTilNow: Array<ChatMessage>, selectedAdvisorId?: string) {
    if (activeAdvisors.length === 0) {
        activeAdvisors = ADVISORS;
    }
    const pitchMsg = `[SYSTEM]: The user has given the following pitch: ${pitch}`;
    const advisorInfo = activeAdvisors.map(advisor => `[SYSTEM]: ${advisor.initialPrompt}`).join("\n");
    const activeUsers = activeAdvisors.map(advisor => `[SYSTEM]: ${advisor.description} is active`).join("\n");
    const currentChat = chatTilNow.map(message => {
        if (message.advisorId === USER_ID) {
            return `[USER]: ${message.message}`
        } else {
            return `[${ADVISOR_MAP[message.advisorId].description}]: ${message.message}`
        }
    }).join("\n");

    let selectedAdvisor  = activeAdvisors.find(advisor => advisor.id === selectedAdvisorId);
    if (selectedAdvisor === undefined) {
        selectedAdvisor = activeAdvisors[Math.floor(Math.random() * activeAdvisors.length)];
    }
    return `${pitchMsg}\n\n${advisorInfo}\n\n${currentChat}\n\n${activeUsers}\n\n[selectedAdvisor.description]: `;
}


export { queryAdvisor, queryAdvisors, chatQuery }
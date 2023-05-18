import { ADVISORS, ADVISOR_MAP, Advisor, AdvisorStatus, ChatMessage, USER_ID } from "../models/advisor";

const OPENAI_SERVICE = "https://xzvf4ed573.execute-api.us-east-1.amazonaws.com/prod/completion"

async function queryOpenAI(prompt: string, stopWords?: Array<string>): Promise<string> {
    let append = "";
    if (stopWords) {
        append += '&' + stopWords.map(word => `stop=${encodeURIComponent(word)}`).join("&")
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

async function chatQuery(activeAdvisors: Array<Advisor>, pitch: string, charTilNow: Array<ChatMessage>, advisorStatus: Record<string, AdvisorStatus>, selectedAdvisorId?: string): Promise<ChatMessage> {
    if (activeAdvisors.length === 0) {
        activeAdvisors = ADVISORS;
    }
    let selectedAdvisor  = activeAdvisors.find(advisor => advisor.id === selectedAdvisorId);
    if (selectedAdvisor === undefined) {
        selectedAdvisor = activeAdvisors[Math.floor(Math.random() * activeAdvisors.length)];
    }
    
    const prompt = chatPrompt(activeAdvisors, pitch, charTilNow, advisorStatus, selectedAdvisor.id);
    const response = await queryOpenAI(prompt, ["[USER]", "[SYSTEM]"]);
    return {
        advisorId: selectedAdvisor.id,
        message: response
    };
}

function chatPrompt(activeAdvisors: Array<Advisor>, pitch: string, chatTilNow: Array<ChatMessage>, advisorStatus: Record<string, AdvisorStatus>, selectedAdvisorId: string) {
    if (activeAdvisors.length === 0) {
        activeAdvisors = ADVISORS;
    }
    const pitchMsg = `[SYSTEM]: The user has given the following pitch to the hackathon advisory board.\n ${pitch}`;
    
    const advisorInfo = activeAdvisors.map(advisor => `[SYSTEM]: ${advisor.initialPrompt}`).join("\n");
    const activeUsers = activeAdvisors.map(advisor => `[SYSTEM]: ${advisor.name} is active`).join("\n");
    const advisorStatusMsg = activeAdvisors.map(advisor => `[SYSTEM]: ${advisor.name} is here to give advice on the pitch.`).join("\n");
    const introChat = activeAdvisors.map(advisor => {
        const status = advisorStatus[advisor.id];
        let message = status.message;
        if (status.status !== "ready" || message === undefined || message === "" || message === null) {
            message = "Great pitch, btw."
        }
        return `[${advisor.name}]: ${message}`
    }).join("\n");

    const currentChat = chatTilNow.map(message => {
        if (message.advisorId === USER_ID) {
            return `[USER]: ${message.message}`
        } else {
            return `[${ADVISOR_MAP[message.advisorId].name}]: ${message.message}`
        }
    }).join("\n");

    const selectedAdvisor = ADVISOR_MAP[selectedAdvisorId];
    return `${pitchMsg}\n${advisorInfo}\n${activeUsers}\n${advisorStatusMsg}\n${introChat}\n${currentChat}\n[${selectedAdvisor.name}]: `;
}


export { queryAdvisor, queryAdvisors, chatQuery }
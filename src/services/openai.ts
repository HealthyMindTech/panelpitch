import { Advisor } from "../models/advisor";

const OPENAI_SERVICE = "https://xzvf4ed573.execute-api.us-east-1.amazonaws.com/prod/completion"

async function queryOpenAI(prompt: string): Promise<string> {
    return fetch(OPENAI_SERVICE + "?temperature=1.2&max_tokens=2048&prompt=" + encodeURIComponent(prompt))
        .then(response => response.json())
        .then(data => data.choices[0].text);
}

async function queryAdvisor(advisor: Advisor, pitch: string): Promise<string> {
    const prompt = `${advisor.initialPrompt}.\n\n
    As an advisor you are advised to give your advice on the following pitch:\n${pitch}\n\nPlease write your brief advice, as though you were, ${advisor.description} here:\n`;

    return queryOpenAI(prompt);
}

function queryAdvisors(advisors: Array<Advisor>, prompt: string, handleAdvisor: (advisor: Advisor, response: string) => void): void {
    advisors.map(advisor => {
        const promise = queryAdvisor(advisor, prompt);
        return promise.then(response => handleAdvisor(advisor, response));
    });
}

export { queryAdvisor, queryAdvisors }
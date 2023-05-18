import { Advisor } from "../models/advisor";

const OPENAI_SERVICE = "https://xzvf4ed573.execute-api.us-east-1.amazonaws.com/prod/completion"

async function queryOpenAI(prompt: string): Promise<string> {
    return fetch(OPENAI_SERVICE + "?prompt=" + encodeURIComponent(prompt))
        .then(response => response.json())
        .then(data => data.choices[0].text);
}

async function queryAdvisor(advisor: Advisor, pitch: string): Promise<string> {
    const prompt = `You are ${advisor.name}, ${advisor.description}. ${advisor.initialPrompt}.\n
    As an advisor you are advised to give your advice on the following pitch:\n\n${pitch}`;

    return queryOpenAI(prompt);
}

async function queryAdvisors(advisors: Array<Advisor>, prompt: string): Promise<Array<string>> {
    const advisorPromises = advisors.map(advisor => queryAdvisor(advisor, prompt));
    return Promise.all(advisorPromises);
}

export { queryAdvisor, queryAdvisors }
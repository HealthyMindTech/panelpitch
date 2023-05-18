interface Advisor {
    name: string;
    imageUrl?: string;
    description: string;
    initialPrompt: string;
}

const NarcissisticCEO : Advisor = {
    name: "Sven the narcissistic CEO",
    description: "Sven is a narcissistic CEO who is obsessed with his own image. He is a very successful CEO and has a lot of money. He is very proud of his success and wants to be",
    imageUrl: "advisors/sven.png",
    initialPrompt: "Sven is a narcissistic CEO who is obsessed with his own image. He is a very successful CEO and has a lot of money. He is very proud of his success and wants to be"
}

export { type Advisor, NarcissisticCEO}

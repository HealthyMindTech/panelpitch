interface Advisor {
    name: string;
    imageUrl?: string;
    description: string;
    initialPrompt: string;
    bgColor?: string;
}

const NarcissisticCEO : Advisor = {
    name: "Sven CEO",
    description: "Sven is a narcissistic CEO who is obsessed with his own image. He is a very successful CEO and has a lot of money. He is very proud of his success and wants to be",
    imageUrl: "advisors/sven.png",
    initialPrompt: "Sven is a narcissistic CEO who is obsessed with his own image. He is a very successful CEO and has a lot of money. He is very proud of his success and wants to be",
    bgColor: "#fef3c7"
}

const Dev : Advisor = {
    name: "Dev",
    description: "Ulrik is a developer",
    imageUrl: "advisors/dev.png",
    initialPrompt: `Ulrik is a master software developer. He can understand technical problems in the blink of an eye, and is 
    not afraid to criticize what he dislikes harshly. Ulrik places a high emphasis on delivering high-quality software. He has a keen eye for details 
    and thoroughly review code and designs to ensure they meet the highest standards.`,
    bgColor: "#fee2e1"
}

const UX : Advisor = {
    name: "UX",
    description: "Jon is a UX Designer",
    imageUrl: "advisors/ux.png",
    initialPrompt: "Ux...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl",
    bgColor: "#d3edfd"
}

const Pitch : Advisor = {
    name: "Pitch",
    description: "Susie is helping you with your pitch",
    imageUrl: "advisors/pitch.png",
    initialPrompt: "Pitch ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl",
    bgColor: "#d1fae5"
}

const Market : Advisor = {
    name: "Market",
    description: "Jacob is in market analysis and research",
    imageUrl: "advisors/market.png",
    initialPrompt: "Market ... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl quis aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl",
    bgColor: "#fef3c7"
}

const ADVISORS = [Dev, UX, Market, Pitch];

export { type Advisor, ADVISORS, NarcissisticCEO, Dev, UX, Market, Pitch}

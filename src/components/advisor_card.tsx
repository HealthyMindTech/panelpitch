import React from 'react';
import { Advisor } from '../models/advisor';
import { Button } from 'react-bootstrap'

const AdvisorCard = ({advisor, side, onChatClick, inChat, chatOpen} : { advisor: Advisor, side: 'left' | 'right', onChatClick: (advisor: Advisor) => void, inChat : boolean, chatOpen : boolean}) : JSX.Element => {
    return (
        <div className='p-2 rounded-2xl flex flex-col mx-auto' style={{background: !inChat && chatOpen ? '#f3f4f6' : advisor.bgColor, width: '120px', minWidth: '120px'}}>
            
            <div className="">
                <img src={advisor.imageUrl} alt={advisor.name} className="h-100 aspect-auto mx-auto" style={{width: 64}}/>
            </div>
            <div className="font-semibold text-center text-sm">{advisor.name}</div>
            <div className="font-semibold text-center">{advisor.role}</div>
            <Button variant="secondary" size="sm" onClick={() => onChatClick(advisor)}>
                {!inChat ? 'Ask to chat' : 'Kick from chat' }
            </Button>
        </div>
    );
}

export { AdvisorCard }
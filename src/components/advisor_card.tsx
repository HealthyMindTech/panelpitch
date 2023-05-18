import React from 'react';
import { Advisor } from '../models/advisor';

const AdvisorCard = ({advisor, side, onChatClick, inChat, chatOpen} : { advisor: Advisor, side: 'left' | 'right', onChatClick: (advisor: Advisor) => void, inChat : boolean, chatOpen : boolean}) : JSX.Element => {
    return (
        <div className='p-2 rounded-2xl flex flex-col mx-auto' style={{background: !inChat && chatOpen ? '#f3f4f6' : advisor.bgColor, width: '120px', minWidth: '120px'}}>
            
            <div className="">
                <img src={advisor.imageUrl} alt={advisor.name} className="h-100 aspect-auto mx-auto" style={{width: 64}}/>
            </div>
            <div className="font-semibold text-center text-sm">{advisor.name}</div>
            <div className="font-semibold text-center">{advisor.role}</div>
            <div className={`flex justify-center`}>
                <div 
                    className="border-x border-y rounded-lg p-0.5 px-1 bg-gray-100 mb-1 text-sm border-gray-300"
                    onClick={() => onChatClick(advisor)}   
                >
                    { !inChat && <span className="material-symbols-outlined relative top-1 mr-1 text-sm">chat</span>}
                    <span className="text-xs">{inChat ? 'Kick from chat' : 'Ask to chat'}</span>
                </div>
            </div>
        </div>
    );
}

export { AdvisorCard }
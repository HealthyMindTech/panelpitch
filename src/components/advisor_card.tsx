import React from 'react';
import { Advisor } from '../models/advisor';

const AdvisorCard = ({advisor, side, onChatClick} : { advisor: Advisor, side: 'left' | 'right', onChatClick: (advisor: Advisor) => void}) : JSX.Element => {
    return (
        <div className='p-2 rounded-2xl flex flex-col mx-auto' style={{background: advisor.bgColor, width: '120px', minWidth: '120px'}}>
            
            <div className="">
                <img src={advisor.imageUrl} alt={advisor.name} className="h-100 aspect-auto mx-auto" style={{width: 64}}/>
            </div>
            <div className="font-semibold text-center">{advisor.name}</div>
            <div className={`flex ${side === 'left' ? 'justify-end' : ''}`}>
                <div 
                    className="border-x border-y rounded-lg p-0.5 bg-gray-100 mb-1 text-sm"
                    onClick={() => onChatClick(advisor)}   
                >
                    <span className="material-symbols-outlined relative top-1 mr-1 text-sm">chat</span>
                    Ask to chat
                </div>
            </div>
        </div>
    );
}

export { AdvisorCard }
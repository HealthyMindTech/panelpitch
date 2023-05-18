import React from 'react';
import Card from 'react-bootstrap/Card';
import { Advisor } from '../models/advisor';

const AdvisorCard = ({advisor, side, onChatClick} : { advisor: Advisor, side: 'left' | 'right', onChatClick: () => void}) : JSX.Element => {
    return (
        <div className='p-2 rounded-2xl flex flex-col' style={{background: advisor.bgColor, width: '100px', minWidth: '100px'}}>
            <div className={`flex ${side === 'left' ? 'justify-end' : ''}`}>
                <div 
                    className="border-x border-y rounded-lg p-0.5 bg-gray-100 mb-1"
                    onClick={onChatClick}   
                >
                    Chat
                </div>
            </div>
            <div className="h-64">
                <img src={advisor.imageUrl} alt={advisor.name} className="h-100 aspect-auto" style={{width: 81}}/>
            </div>
            <div className="font-semibold text-center">{advisor.name}</div>
        </div>
    );
}

export { AdvisorCard }
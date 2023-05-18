import React from 'react';
import Card from 'react-bootstrap/Card';
import { Advisor } from '../models/advisor';

const AdvisorCard = ({advisor} : { advisor: Advisor}) : JSX.Element => {
    return (
        <div className='p-2 rounded-2xl' style={{background: advisor.bgColor}}>
            <div className="flex justify-end">
                <div className="border-x border-y rounded-lg p-0.5 bg-gray-100 mb-1">
                    Chat
                </div>
            </div>
            <img src={advisor.imageUrl} alt={advisor.name} className="max-h-60"/>
            <div className="font-semibold text-center">{advisor.name}</div>
        </div>
    );
}

export { AdvisorCard }
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Advisor } from '../models/advisor';

const AdvisorCard = ({advisor} : { advisor: Advisor}) : JSX.Element => {
    return (
        <div className='p-2 rounded-lg' style={{background: advisor.bgColor}}>
            <img src={advisor.imageUrl} alt={advisor.name} className="max-h-60"/>
            <div className="font-semibold text-center">{advisor.name}</div>
        </div>
    );
}

export { AdvisorCard }
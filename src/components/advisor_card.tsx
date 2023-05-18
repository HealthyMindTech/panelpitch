import React from 'react';
import Card from 'react-bootstrap/Card';
import { Advisor } from '../models/advisor';

const AdvisorCard = ({advisor} : { advisor: Advisor}) : JSX.Element => {
    return (
        <Card>
            <Card.Header>{advisor.name}</Card.Header>
            { advisor.imageUrl && <Card.Img height={100} width={100} variant="top" src={advisor.imageUrl} /> }
            <Card.Body>
                <Card.Text>Hello there</Card.Text>
            </Card.Body>
        </Card>
    );
}

export { AdvisorCard }
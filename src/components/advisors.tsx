import React, { useRef }  from 'react';
import { Advisor, AdvisorStatus } from '../models/advisor';
import { UX, Market, Dev, Pitch } from '../models/advisor';
import { AdvisorCard } from './advisor_card';
import { AdvisorSpeechBubble } from './advisor_speech_bubble';


const Advisors = ({advisorStatus}: {advisorStatus: Record<string, AdvisorStatus>}) : JSX.Element => {
    // Which of the chats are expanded
    const [expanded, setExpanded] = React.useState<number>(-1); // -1 means no chat is expanded
    const [chatParticipants, setChatParticipants] = React.useState<Advisor[]>([]);

    const gridRef = useRef<HTMLDivElement>(null);

    const advisors = [UX, Market, Dev, Pitch];

    const handleChatClick = (advisor: Advisor) => {
        if (chatParticipants.includes(advisor)) {
            setChatParticipants(chatParticipants.filter((a) => a !== advisor));
            if (chatParticipants.length === 1) {
                setExpanded(-1);
            }
        } else {
            if (chatParticipants.length === 0) {
                setExpanded(advisors.indexOf(advisor));
            }
            setChatParticipants([...chatParticipants, advisor]);
        }
    }

    return (
        <div className="grid grid-cols-8 gap-y-6" style={{maxHeight: '430px'}} ref={gridRef}>
            <div className="">
                <AdvisorCard advisor={UX} side='left' onChatClick={handleChatClick} inChat={chatParticipants.indexOf(UX) !== -1} chatOpen={expanded !== -1}/>
            </div>
            {/* if collapsed: 1x5, if expanded, 2x10 */}
            <div className={expanded === -1 ? "col-span-3" : expanded === 0 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden"}>
                <AdvisorSpeechBubble status={advisorStatus[UX.id].status} text={advisorStatus[UX.id].message} expanded={expanded === 0} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div className={expanded === -1 ? "col-span-3" : expanded === 1 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden" }>
                <AdvisorSpeechBubble status={advisorStatus[Pitch.id].status} text={advisorStatus[Pitch.id].message} expanded={expanded === 1} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div>
                <AdvisorCard advisor={Pitch} side='right' onChatClick={handleChatClick} inChat={chatParticipants.indexOf(Pitch) !== -1} chatOpen={expanded !== -1}/>
            </div>
            <div>
                <AdvisorCard advisor={Dev} side='left' onChatClick={handleChatClick} inChat={chatParticipants.indexOf(Dev) !== -1} chatOpen={expanded !== -1}/>
            </div>
            <div className={expanded === -1 ? "col-span-3" : expanded === 2 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden" }>
                <AdvisorSpeechBubble status={advisorStatus[Dev.id].status} text={advisorStatus[Dev.id].message} expanded={expanded === 2} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div className={expanded === -1 ? "col-span-3" : expanded === 3 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden" }>
                <AdvisorSpeechBubble status={advisorStatus[Market.id].status} text={advisorStatus[Market.id].message} expanded={expanded === 3} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div>
                <AdvisorCard advisor={Market} side='right' onChatClick={handleChatClick} inChat={chatParticipants.indexOf(Market) !== -1} chatOpen={expanded !== -1}/>
            </div>

        </div>

        // <Row>
        //   <Col xs={6}>
        //     <AdvisorSection advisor={UX} side='left' />
        //     <AdvisorSection advisor={Dev} side='left' />
        //   </Col>
        //   <Col xs={6}>
        //     <AdvisorSection advisor={Pitch} side='right' />
        //     <AdvisorSection advisor={Market} side='right' />
        //   </Col>
        // </Row>
    );
}

export { Advisors }
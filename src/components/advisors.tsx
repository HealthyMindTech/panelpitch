import React, { useRef, useEffect }  from 'react';
import { wrapGrid } from 'animate-css-grid'
import { Advisor } from '../models/advisor';
import { UX, Market, Dev, Pitch } from '../models/advisor';
import { AdvisorCard } from './advisor_card';
import { AdvisorSpeechBubble } from './advisor_speech_bubble';


const Advisors = () : JSX.Element => {
    // Which of the chats are expanded
    const [expanded, setExpanded] = React.useState<number>(-1); // -1 means no chat is expanded
    const [chatParticipants, setChatParticipants] = React.useState<Advisor[]>([]);

    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gridRef.current) {
            // wrapGrid(gridRef.current, { duration: 800 });
        }
    }, [gridRef.current]);

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
        <div className="grid grid-cols-8 gap-y-6" style={{maxHeight: '400px'}} ref={gridRef}>
            <div className="">
                <AdvisorCard advisor={UX} side='left' onChatClick={handleChatClick} />
            </div>
            {/* if collapsed: 1x5, if expanded, 2x10 */}
            <div className={expanded === -1 ? "col-span-3 mr-5" : expanded === 0 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden"}>
                <AdvisorSpeechBubble text="Hello" expanded={expanded === 0} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div className={expanded === -1 ? "col-span-3 ml-5" : expanded === 1 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden"}>
                <AdvisorSpeechBubble text="Hello" expanded={expanded === 1} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div>
                <AdvisorCard advisor={Pitch} side='right' onChatClick={handleChatClick} />
            </div>
            <div>
                <AdvisorCard advisor={Dev} side='left' onChatClick={handleChatClick} />
            </div>
            <div className={expanded === -1 ? "col-span-3 mr-5" : expanded === 2 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden"}>
                <AdvisorSpeechBubble text="Hello" expanded={expanded === 2} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div className={expanded === -1 ? "col-span-3 ml-5" : expanded === 3 ? "col-start-2 row-start-1 row-span-2 col-span-6" : "hidden"}>
                <AdvisorSpeechBubble text="Hello" expanded={expanded === 3} closeChat={() => {setExpanded(-1)}} chatParticipants={chatParticipants}/>
            </div>
            <div>
                <AdvisorCard advisor={Market} side='right' onChatClick={handleChatClick} />
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
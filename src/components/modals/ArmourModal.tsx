import * as React from "react";
import {useRef} from 'react';
import {GameTypes} from "../../features/types";
import useOverflowCheck from "../../hooks/useOverflowCheck";

const ArmourModal = ({item}: {item: GameTypes.GameItem}) => {
    const element: React.MutableRefObject<HTMLDivElement> = useRef()
    const isOverflowing: boolean = useOverflowCheck(element)
    return (
        <div ref={element} className={`background-settings ${isOverflowing ? 'overflowing-item-info-modal' : 'item-info-modal'}`} style={{backgroundImage: `url(${item.background})`}}>
            <div><b>Tier</b>: {item.tier}</div>
            <div><b>Armour</b>: {item.armourPoints}</div>
            <div><b>Effects</b>:
                <div className='d-flex flex-column gap-2 px-2 py-1'>
                    {item.effects.map((effect, index) =>
                        <div key={index} style={{fontSize: '13px'}}>
                            <b>Name:</b> {effect.name} <br/>
                            <b>Probability</b>: {effect.probability}%
                        </div>)}
                </div>
            </div>
        </div>
    );
};

export default ArmourModal;
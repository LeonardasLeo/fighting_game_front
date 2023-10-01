import * as React from "react";
import {useRef} from 'react';
import useOverflowCheck from "../../hooks/useOverflowCheck.js";
import {GameItem} from "../../features/types";

const ArmourModal = ({item}: {item: GameItem}) => {
    const element = useRef()
    const isOverflowing = useOverflowCheck(element)
    return (
        <div ref={element} className={`backgroundSettings ${isOverflowing ? 'overflowingItemInfoModal' : 'itemInfoModal'}`} style={{backgroundImage: `url(${item.background})`}}>
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
import * as React from 'react';
import {useRef} from "react";
import useOverflowCheck from "../../hooks/useOverflowCheck.js";
import {effectType, gameItem} from "../../features/types";

const WeaponModal = ({item}: {item: gameItem}) => {
    const ref: React.MutableRefObject<HTMLDivElement> = useRef()
    const isOverflowing: boolean = useOverflowCheck(ref)

    return (
        <div ref={ref} className={`backgroundSettings ${isOverflowing ? 'overflowingItemInfoModal' : 'itemInfoModal'}`} style={{backgroundImage: `url(${item.background})`}}>
            <div><b>Tier</b>: {item.tier}</div>
            <div>
                <b>Damage</b>:
                <div className='d-flex flex-column px-2 py-1' style={{fontSize: '13px'}}>
                    <div><b>Min:</b> {item.damage.min}</div>
                    <div><b>Max:</b> {item.damage.max}</div>
                </div>
            </div>
            <div><b>Effects</b>:
                <div className='d-flex flex-column gap-2 px-2 py-1'>
                    {item.effects.map((effect: effectType, index: number) =>
                        <div key={index} style={{fontSize: '13px'}}>
                            <b>Name:</b> {effect.name} <br/>
                            <b>Probability</b>: {effect.probability}%
                        </div>)}
                </div>
            </div>
            <div><b>Max Gold/Hit</b>: {item.maxGold}</div>
        </div>
    );
};

export default WeaponModal;
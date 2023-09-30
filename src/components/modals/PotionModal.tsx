import * as React from "react";
import {useRef} from 'react';
import useOverflowCheck from "../../hooks/useOverflowCheck.js";
import {gameItem} from "../../features/types";

const PotionModal = ({item}: {item: gameItem}) => {
    const element = useRef()
    const isOverflowing = useOverflowCheck(element)
    return (
        <div ref={element} className={`backgroundSettings ${isOverflowing ? 'overflowingItemInfoModal' : 'itemInfoModal'}`} style={{backgroundImage: `url(${item.background})`}}>
            <div>
                <b>Restores:</b> {item.hp} HP
            </div>
        </div>
    );
};

export default PotionModal;
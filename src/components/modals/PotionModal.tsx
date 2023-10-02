import * as React from "react";
import {useRef} from 'react';
import {GameTypes} from "../../features/types";
import useOverflowCheck from "../../hooks/useOverflowCheck";

const PotionModal = ({item}: {item: GameTypes.GameItem}) => {
    const element: React.MutableRefObject<HTMLDivElement> = useRef()
    const isOverflowing: boolean= useOverflowCheck(element)

    return (
        <div ref={element} className={`background-settings ${isOverflowing ? 'overflowing-item-info-modal' : 'item-info-modal'}`} style={{backgroundImage: `url(${item.background})`}}>
            <div>
                <b>Restores:</b> {item.hp} HP
            </div>
        </div>
    );
};

export default PotionModal;
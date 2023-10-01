import * as React from 'react';
import '../../App.css'
import WeaponModal from "./WeaponModal";
import ArmourModal from "./ArmourModal";
import PotionModal from "./PotionModal";
import {GameItem} from "../../features/types";

const MoreItemInfoModal = ({item}: {item: GameItem}) => {
    return (
        <div>
            {item.type === 'weapon' ? <WeaponModal item={item}/>
                : item.type === 'armour' ? <ArmourModal item={item}/>
                    : <PotionModal item={item}/>
            }
        </div>
    );
};

export default MoreItemInfoModal;
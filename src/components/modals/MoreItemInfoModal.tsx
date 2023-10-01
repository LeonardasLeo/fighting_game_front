import * as React from 'react';
import {GameTypes} from "../../features/types";
import WeaponModal from "./WeaponModal";
import ArmourModal from "./ArmourModal";
import PotionModal from "./PotionModal";
import '../../App.css'

const MoreItemInfoModal = ({item}: {item: GameTypes.GameItem}) => {
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
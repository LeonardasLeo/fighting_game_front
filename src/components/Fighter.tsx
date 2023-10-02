import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {GameTypes, UserTypes} from "../features/types";
import SelectedItem from "./selectedItem";


const Fighter = ({user} : {user: UserTypes.BattleUser}) => {
    return (
        <div className='flex-1 battle-side'>
            <div className='fs-4'>{user.gold} <FontAwesomeIcon icon={faCoins} color='#DAA451FF' /></div>
            <img src={user.character} alt=""/>
            <div className='bar mt-3'>
                <div className='health-bar' style={{width: `${user.health}%`}}></div>
            </div>
            <div className='battle-message'>{user.message}</div>
            <div className='d-flex justify-content-evenly mt-3'>
                {user.selectedItems.map((item: GameTypes.GameItem) =>
                    <SelectedItem key={item.type} item={item}/>
                )}
            </div>
        </div>
    );
};

export default Fighter;
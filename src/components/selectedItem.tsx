import * as React from "react";
import {useState} from 'react';
import {useSelector} from "react-redux";
import {socket} from "../App";
import {GameTypes, ReduxTypes, UserTypes} from "../features/types";
import MoreItemInfoModal from "./modals/MoreItemInfoModal";
import '../App.css'

const SelectedItem = ({item}: {item: GameTypes.GameItem}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const user: UserTypes.BattleUser = useSelector((state: ReduxTypes.ReduxUsers) => state.users.userInBattleOne)
    const roomName: string = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.roomName)
    function drinkPotion () {
        if (item.hp && user){
            socket.emit('requestPotionDrink', {user: user, item, roomName})
        }
    }

    return (
        <div className='selectedItem backgroundSettings'  style={{backgroundImage: `url(${item.background})`}}
            onMouseEnter={() => setIsModalVisible(true)}
            onMouseLeave={() => setIsModalVisible(false)}
             onClick={() => {item.type === 'potion' && drinkPotion()}}
        >
            {isModalVisible && item.image && <MoreItemInfoModal item={item}/> }
            {item.image
                ? <img src={item.image} alt=""/>
                : <div>{item.type}</div>
            }
        </div>
    );
};

export default SelectedItem;
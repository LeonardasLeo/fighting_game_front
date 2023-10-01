// @ts-ignore
import React, {useState} from 'react';
import '../App.css'
import MoreItemInfoModal from "./modals/MoreItemInfoModal";
import {BattleUser, GameItem, ReduxOtherStates, ReduxUsers} from "../features/types";
import {useSelector} from "react-redux";
import {socket} from "../App";
const SelectedItem = ({item}: {item: GameItem}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const user: BattleUser = useSelector((state: ReduxUsers) => state.users.userInBattleOne)
    const roomName: string = useSelector((state: ReduxOtherStates) => state.otherStates.roomName)
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
// @ts-ignore
import React, {useState} from 'react';
import '../App.css'
import MoreItemInfoModal from "./modals/MoreItemInfoModal";
import {gameItem} from "../features/types";
const SelectedItem = ({item}: {item: gameItem}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    return (
        <div className='selectedItem backgroundSettings'  style={{backgroundImage: `url(${item.background})`}}
            onMouseEnter={() => setIsModalVisible(true)}
            onMouseLeave={() => setIsModalVisible(false)}
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
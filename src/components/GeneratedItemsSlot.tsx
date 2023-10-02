import * as React from "react";
import {useState} from 'react';
import MoreItemInfoModal from "./modals/MoreItemInfoModal";
import {useDispatch} from "react-redux";
import {updateUser} from "../features/users";
import {updateError} from "../features/error";
import {GameTypes} from "../features/types";
import config from "../config";
import '../App.css'


const GeneratedItemsSlot = ({item}: {item: GameTypes.GameItem}) => {
    const serverRoute: string = config.serverRoute
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const token: string = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    async function takeItem (item) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(item)
        }
        const response = await fetch(`${serverRoute}/takeItem`, options)
        const data = await response.json()
        if (!data.error){
            dispatch(updateUser(data.data))
        }else{
            dispatch(updateError(data.message))
        }
    }
    return (
        <div style={{position: 'relative'}}>
            <div className='generated-items-slot background-settings' style={{backgroundImage: `url(${item.background})`}}
                 onMouseEnter={() => setIsModalVisible(true)}
                 onMouseLeave={() => setIsModalVisible(false)}
                 onClick={() => takeItem(item)}>
                <div className='d-flex justify-content-center fw-bold text-dark'>Click to take!</div>
                <div>
                    <img src={item.image} alt=""/>
                </div>
            </div>
            {isModalVisible && <MoreItemInfoModal item={item}/>}
        </div>

);
};

export default GeneratedItemsSlot;
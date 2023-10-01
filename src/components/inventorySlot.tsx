import * as React from "react";
import {useState} from 'react';
import MoreItemInfoModal from "./modals/MoreItemInfoModal";
import {useDispatch} from "react-redux";
import {updateUser} from "../features/users";
import {updateError} from "../features/error";
import config from "../config";
import {GameTypes} from "../features/types";

const InventorySlot = ({item} : {item: GameTypes.GameItem}) => {
    const serverRoute: string = config.serverRoute
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const token: string = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    async function selectItem (item) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            },
            body: JSON.stringify(item)
        }
        const response = await fetch(`${serverRoute}/selectItem`, options)
        const data = await response.json()
        if (!data.error){
            dispatch(updateUser(data.data))
            dispatch(updateError(''))
        }else{
            dispatch(updateError(data.message))
        }
    }
    async function deleteFromInventory (id) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            }
        }
        const response = await fetch(`${serverRoute}/deleteItemFromInventory/${id}`, options)
        const data = await response.json()
        if (!data.error){
            dispatch(updateUser(data.data))
        }else{
            dispatch(updateError(data.message))
        }
    }
    return (
        <div style={{position: 'relative'}}>
            <div className='inventorySlot backgroundSettings'
                 style={{backgroundImage: `url(${item.background})`}}
                 onClick={() => selectItem(item)}
                 onMouseEnter={() => setIsModalVisible(true)}
                 onMouseLeave={() => setIsModalVisible(false)}
            >
                {isModalVisible && item.image && <MoreItemInfoModal item={item}/>}
                <img src={item.image} alt=""/>
            </div>
            {item && <div className='deleteFromInventoryButton' onClick={() => deleteFromInventory(item.id)}>❌</div>}
        </div>
    );
};

export default InventorySlot;
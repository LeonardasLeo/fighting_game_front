// @ts-ignore
import React, {useState} from 'react';
import '../App.css'
import MoreItemInfoModal from "./modals/MoreItemInfoModal";
import {useDispatch} from "react-redux";
import {updateUser} from "../features/users";
import {updateError} from "../features/error";
import {GameItem} from "../features/types";

const GeneratedItemsSlot = ({item}: {item: GameItem}) => {
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
        const response = await fetch('http://192.168.1.147:3001/takeItem', options)
        const data = await response.json()
        if (!data.error){
            dispatch(updateUser(data.data))
        }else{
            dispatch(updateError(data.message))
        }
    }
    return (
        <div className='generatedItemsSlot backgroundSettings' style={{backgroundImage: `url(${item.background})`}}
             onMouseEnter={() => setIsModalVisible(true)}
             onMouseLeave={() => setIsModalVisible(false)}>
            {isModalVisible && item.image && <MoreItemInfoModal item={item}/>}
            <img src={item.image} alt=""/>
            <button className='btn btn-primary' onClick={() => takeItem(item)}>Take</button>
        </div>
    );
};

export default GeneratedItemsSlot;
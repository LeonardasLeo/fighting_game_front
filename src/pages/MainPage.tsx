import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateHasUserLeft} from "../features/otherStates";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCard from "../components/UserCard.jsx";
import GeneratedItemsSlot from "../components/GeneratedItemsSlot.jsx";
import Inventory from "../components/Inventory.jsx";
import {socket} from "../App.jsx";
import DefaultGenerationDisplay from "../components/DefaultGenerationDisplay.jsx";
import InvitationModal from "../components/modals/InvitationModal.jsx";
import {
    defaultGeneration,
    gameItem,
    onlineUser,
    reduxOtherStates,
    reduxUsers, userType
} from "../features/types";

const MainPage = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const user: userType = useSelector((state: reduxUsers) => state.users.myUser)
    const onlineUsers: onlineUser[] = useSelector((state: reduxUsers) => state.users.onlineUsers)
    const token: string = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    const invitationModal = useSelector((state: reduxOtherStates) => state.otherStates.invitationModal)
    const [generatedItems, setGeneratedItems] = useState<defaultGeneration[] | gameItem[]>([
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', default: true},
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', default: true},
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', default: true}
    ])
    useEffect(() => {
        socket.emit('userConnected', token)
        socket.emit('requestOnlineUsers', token)
        dispatch(updateHasUserLeft({state: false, message: null}))
    }, [])
    function logout () {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        nav('/login')
    }
    function generateItems () {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: token
            }
        }
        fetch('http://192.168.1.147:3001/generateItems', options)
            .then(res => res.json())
            .then(data => {
                if (!data.error){
                    setGeneratedItems(data.data)
                }else{
                    console.log(data.message)
                }
            })
    }
    return (
        <div>
            {invitationModal.state && <InvitationModal data={invitationModal.data}/>}
            <div className={invitationModal.state ? 'p-3 opacity' : 'p-3'}>
                <nav className='d-flex justify-content-between align-items-center'>
                    <div><b>Money:</b> {user.money}$</div>
                    <div style={{color: 'red'}}></div>
                    <button className='btn btn-dark' onClick={logout}>Logout</button>
                </nav>
                <div className='d-flex gap-3 mt-3'>
                    <div className='d-flex flex-column flex-1'>
                        <div className='flex-1 d-flex flex-column'>
                            <div className='d-flex justify-content-between gap-3'>
                                {generatedItems.map((item: gameItem | defaultGeneration, index) =>
                                    item.default
                                        ? <DefaultGenerationDisplay key={index} item={item}/>
                                        : <GeneratedItemsSlot key={item.type} item={item}/>
                                )}
                            </div>
                            <button className='btn btn-warning btn-lg mt-3' onClick={generateItems}>Generate: 100$</button>
                        </div>
                        <div className='flex-1 mt-3'>
                            <Inventory/>
                        </div>
                    </div>
                    <div className='userList flex-1'>
                        {onlineUsers !== undefined && onlineUsers.map((user: onlineUser) => <UserCard key={user.username} user={user}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
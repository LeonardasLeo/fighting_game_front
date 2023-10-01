import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateBattleWon, updateHasUserLeft} from "../features/otherStates";
import {updateUser} from "../features/users";
import {updateError} from "../features/error";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCard from "../components/UserCard.jsx";
import GeneratedItemsSlot from "../components/GeneratedItemsSlot.jsx";
import Inventory from "../components/Inventory.jsx";
import {socket} from "../App.jsx";
import DefaultGenerationDisplay from "../components/DefaultGenerationDisplay.jsx";
import InvitationModal from "../components/modals/InvitationModal.jsx";
import config from "../config";
import '../App.css'
import {
    DefaultGeneration,
    GameItem,
    OnlineUser, ReduxErrorStates,
    ReduxOtherStates,
    ReduxUsers, UserType
} from "../features/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins, faTools} from "@fortawesome/free-solid-svg-icons";


const MainPage = () => {
    const serverRoute = config.serverRoute
    const nav = useNavigate()
    const dispatch = useDispatch()
    const user: UserType = useSelector((state: ReduxUsers) => state.users.myUser)
    const onlineUsers: OnlineUser[] = useSelector((state: ReduxUsers) => state.users.onlineUsers)
    const token: string = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    const invitationModal = useSelector((state: ReduxOtherStates) => state.otherStates.invitationModal)
    const error = useSelector((state: ReduxErrorStates) => state.errors.error)
    const [generatedItems, setGeneratedItems] = useState<DefaultGeneration[] | GameItem[]>([
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', type: 'default'},
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', type: 'default'},
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', type: 'default'}
    ])
    useEffect(() => {
        socket.emit('userConnected', token)
        socket.emit('requestOnlineUsers', token)
        dispatch(updateHasUserLeft({state: false, message: null}))
        dispatch(updateBattleWon({state: false, message: null}))
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
        fetch(`${serverRoute}/generateItems/${user.money}`, options)
            .then(res => res.json())
            .then(data => {
                if (!data.error){
                    dispatch(updateUser(data.data.user))
                    setGeneratedItems(data.data.generatedItems)
                }else{
                    dispatch(updateError(data.message))
                }
            })
    }
    return (
        <div>
            {user && <div>
                {invitationModal.state && <InvitationModal data={invitationModal.data}/>}
                <div className={invitationModal.state ? 'p-3 opacity' : 'p-3'}>
                    <nav className='d-flex justify-content-between align-items-center fs-5'>
                        <div><FontAwesomeIcon icon={faCoins} color='#DAA451FF' /> {user.money}</div>
                        <div className='fs-3' style={{color: 'red'}}><b>{error}</b></div>
                        <div className='d-flex align-items-center gap-5'>
                            <div>
                                <b>Logged in as:</b> {user.username}
                            </div>
                            <button className='btn btn-secondary' onClick={logout}>Log out</button>
                        </div>
                    </nav>
                    <div className='d-flex gap-3 mt-3'>
                        <div className='d-flex flex-column flex-1'>
                            <div className='flex-1 d-flex flex-column'>
                                <div className='d-flex justify-content-between gap-3'>
                                    {generatedItems.map((item: GameItem | DefaultGeneration, index) =>
                                        item.type === 'default'
                                            ? <DefaultGenerationDisplay key={index} item={item as DefaultGeneration}/>
                                            : <GeneratedItemsSlot key={index} item={item as GameItem}/>
                                    )}
                                </div>
                                <button className='btn btn-warning btn-lg mt-3' onClick={generateItems}>Generate: 100<FontAwesomeIcon icon={faCoins} color='black' /></button>
                            </div>
                            <div className='flex-1 mt-3'>
                                <Inventory/>
                            </div>
                        </div>
                        <div className='userList flex-1'>
                            {onlineUsers !== undefined && onlineUsers.map((user: OnlineUser) => <UserCard key={user.username} user={user}/>)}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default MainPage;
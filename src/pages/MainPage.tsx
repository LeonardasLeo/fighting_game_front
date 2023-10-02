import * as React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateBattleWon, updateHasUserLeft} from "../features/otherStates";
import {updateUser} from "../features/users";
import {updateError} from "../features/error";
import {socket} from "../App.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {GameTypes, ReduxTypes, UserTypes} from "../features/types";
import config from "../config";
import UserCard from "../components/UserCard.jsx";
import GeneratedItemsSlot from "../components/GeneratedItemsSlot.jsx";
import Inventory from "../components/Inventory.jsx";
import DefaultGenerationDisplay from "../components/DefaultGenerationDisplay.jsx";
import InvitationModal from "../components/modals/InvitationModal.jsx";
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'


const MainPage = () => {
    const serverRoute: string = config.serverRoute
    const dispatch = useDispatch()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxUsers) => state.users.myUser)
    const onlineUsers: UserTypes.OnlineUser[] = useSelector((state: ReduxTypes.ReduxUsers) => state.users.onlineUsers)
    const token: string = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    const invitationModal = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.invitationModal)
    const [generatedItems, setGeneratedItems] = useState<GameTypes.DefaultGeneration[] | GameTypes.GameItem[]>([
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', type: 'default'},
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', type: 'default'},
        {image: 'https://mario.wiki.gallery/images/thumb/7/7f/Question_Block_-_Nintendo_JP_website.png/1200px-Question_Block_-_Nintendo_JP_website.png', type: 'default'}
    ])
    useEffect(() => {
        socket.emit('userConnected', token)
        socket.emit('requestOnlineUsers', token)
        dispatch(updateHasUserLeft({state: false, message: null}))
        dispatch(updateBattleWon({state: false, message: null}))
        dispatch(updateError(''))
    }, [])
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
            {user &&
                <div>
                    {invitationModal.state && <InvitationModal data={invitationModal.data}/>}
                        <div className={invitationModal.state ? 'p-3 opacity' : 'p-3'}>
                            <Navbar/>
                            <div className='d-flex gap-3 mt-3'>
                                <div className='d-flex flex-column flex-1'>
                                    <div className='flex-1 d-flex flex-column align-items-center '>
                                        <div className='d-flex justify-content-between gap-3 w-700'>
                                            {generatedItems.map((item: GameTypes.GameItem | GameTypes.DefaultGeneration, index) =>
                                                item.type === 'default'
                                                    ? <DefaultGenerationDisplay key={index} item={item as GameTypes.DefaultGeneration}/>
                                                    : <GeneratedItemsSlot key={index} item={item as GameTypes.GameItem}/>
                                            )}
                                        </div>
                                        <button className='btn btn-warning btn-lg mt-3' onClick={generateItems}>Generate: 100<FontAwesomeIcon icon={faCoins} color='black' /></button>
                                    </div>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <Inventory/>
                                    </div>
                                </div>
                                <div className='user-list flex-1'>
                                    {onlineUsers !== undefined && onlineUsers.map((user: UserTypes.OnlineUser) => <UserCard key={user.username} user={user}/>)}
                                </div>
                             </div>
                        </div>
                </div>}
        </div>
    );
};

export default MainPage;
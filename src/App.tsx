import './App.scss'
import RegisterPage from "./pages/RegisterPage.jsx";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import {useEffect, useState} from "react";
import { io } from 'socket.io-client';
import ArenaPage from "./pages/ArenaPage.jsx";
import {
    updateOnlineUsers,
    updateUser,
    updateBattleUserOne,
    updateBattleUserTwo
} from "./features/users";
import {updateInvitationModal, updateBattleWon, updateHasUserLeft} from "./features/otherStates";
import {useDispatch} from "react-redux";
import {store} from "./main.jsx";
import {BattleCommunicationData, BattleUser, InvitationReceived, OnlineUser, UserType} from "./features/types";
import config from "./config";

export const socket = io(`${config.serverRoute}`, {
    autoConnect: true
})
function App() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const isJwtToken = localStorage.getItem('token')|| sessionStorage.getItem('token')
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (isJwtToken){
            nav('/main')
        }else{
            nav('/login')
        }
        socket.on('getUserData', (val: UserType) => {
            dispatch(updateUser(val))
        })
        socket.on('getOnlineUsers', (val: OnlineUser[]) =>{
            dispatch(updateOnlineUsers(val))
        })
        socket.on('invitationReceived', (val: InvitationReceived) => {
            dispatch(updateInvitationModal({state: true, data: val}))
        })
        socket.on('invitationAcceptedServer', ({roomName, first, second}) => {
            socket.emit('joinRoom', {roomName, id: socket.id})
            nav('/arena', {state: {roomName, first, second}})
        })
        socket.on('getBattleUsers', ({first, second}: BattleCommunicationData) => {
            const user:UserType = store.getState().users.myUser
            if (first.username === user.username){
                dispatch(updateBattleUserOne({...first, health: 100, gold: 0}))
                dispatch(updateBattleUserTwo({...second, health: 100, gold: 0}))
            }else{
                dispatch(updateBattleUserOne({...second, health: 100, gold: 0}))
                dispatch(updateBattleUserTwo({...first, health: 100, gold: 0}))
            }
        })
        socket.on('attack', (val: BattleCommunicationData) => {
            const user: UserType = store.getState().users.myUser
            if (val.first.username === user.username){
                dispatch(updateBattleUserOne(val.first))
                dispatch(updateBattleUserTwo(val.second))
            }else{
                dispatch(updateBattleUserOne(val.second))
                dispatch(updateBattleUserTwo(val.first))
            }
        })
        socket.on('drinkPotion', (val: BattleUser) => {
            const user: UserType = store.getState().users.myUser
            if (val.username === user.username){
                dispatch(updateBattleUserOne(val))
            }else{
                dispatch(updateBattleUserTwo(val))
            }
        })
        socket.on('battleWon', (data: BattleCommunicationData) => {
            dispatch(updateBattleUserOne(data.first))
            dispatch(updateBattleUserTwo(data.second))
            dispatch(updateBattleWon({state: true, message: data.message}))
        })
        socket.on('pageWasReloaded', (val: string) => {
            dispatch(updateHasUserLeft({state: true, message: val}))
        })
        socket.on('error', (val: string) => {
            setIsError(true)
            setError(val)
        })
    }, [])

    return (
        <>
            {isError
                ?
                <div className='p-3'>{error}</div>
                :
                <Routes>
                    <Route path='/' element={<RegisterPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/main' element={<MainPage/>}/>
                    <Route path='/arena' element={<ArenaPage/>}/>
                </Routes>
            }

        </>
    )
}

function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;

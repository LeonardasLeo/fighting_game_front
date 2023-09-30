import './App.scss'
import RegisterPage from "./pages/RegisterPage.jsx";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import {useEffect} from "react";
import { io } from 'socket.io-client';
import ArenaPage from "./pages/ArenaPage.jsx";
import {updateOnlineUsers, updateBattleUsers, updateUser} from "./features/users";
import {updateInvitationModal, updateBattleWon, updateHasUserLeft} from "./features/otherStates";
import {useDispatch} from "react-redux";
import {store} from "./main.jsx";
import {battleCommunicationData, invitationReceived, onlineUser, userType} from "./features/types";

export const socket = io('http://192.168.1.147:3001', {
    autoConnect: true
})
function App() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    useEffect(() => {
        const isJwtToken = localStorage.getItem('token')|| sessionStorage.getItem('token')
        if (isJwtToken){
            nav('/main')
        }else{
            nav('/login')
        }
        socket.on('getUserData', (val: userType) => {
            dispatch(updateUser(val))
        })
        socket.on('getOnlineUsers', (val: onlineUser[]) =>{
            dispatch(updateOnlineUsers(val))
        })
        socket.on('invitationReceived', (val: invitationReceived) => {
            dispatch(updateInvitationModal({state: true, data: val}))
        })
        socket.on('invitationAcceptedServer', ({roomName, first, second}) => {
            socket.emit('joinRoom', {roomName, id: socket.id})
            nav('/arena', {state: {roomName, first, second}})
        })
        socket.on('getBattleUsers', ({first, second}: battleCommunicationData) => {
            // @ts-ignore
            const user = store.getState().users.myUser
            if (first.username === user.username){
                dispatch(updateBattleUsers({first: {...first, health: 100, gold: 0}, second: {...second, health: 100, gold: 0}}))
            }else{
                dispatch(updateBattleUsers({first: {...second, health: 100, gold: 0}, second: {...first, health: 100, gold: 0}}))
            }
        })
        socket.on('attack', (val: battleCommunicationData) => {
            // @ts-ignore
            const user = store.getState().users.myUser
            if (val.first.username === user.username){
                dispatch(updateBattleUsers({first: val.first, second: val.second}))
            }else{
                dispatch(updateBattleUsers({first: val.second, second: val.first}))
            }
        })
        socket.on('battleWon', (data: battleCommunicationData) => {
            dispatch(updateBattleUsers({first: data.first, second: data.second}))
            dispatch(updateBattleWon({state: true, message: data.message}))
        })
        socket.on('pageWasReloaded', (val: string) => {
            dispatch(updateHasUserLeft({state: true, message: val}))
        })
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/main' element={<MainPage/>}/>
                <Route path='/arena' element={<ArenaPage/>}/>
            </Routes>
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

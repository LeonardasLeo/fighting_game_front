import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {DataTypes, UserTypes} from "./features/types";
import { io } from 'socket.io-client';
import {store} from "./main.jsx";
import config from "./config";
import {
    updateOnlineUsers,
    updateUser,
    updateBattleUserOne,
    updateBattleUserTwo
} from "./features/users";
import {
    updateInvitationModal,
    updateBattleWon,
    updateHasUserLeft,
    updateAttacker,
    updateAttackTime
} from "./features/otherStates";
import ArenaPage from "./pages/ArenaPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
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
        socket.on('getUserData', (val: UserTypes.User) => {
            dispatch(updateUser(val))
        })
        socket.on('getOnlineUsers', (val: UserTypes.OnlineUser[]) =>{
            dispatch(updateOnlineUsers(val))
        })
        socket.on('invitationReceived', (val: DataTypes.InvitationReceived) => {
            dispatch(updateInvitationModal({state: true, data: val}))
        })
        socket.on('invitationAcceptedServer', ({roomName, first, second}) => {
            socket.emit('joinRoom', {roomName, id: socket.id})
            nav('/arena', {state: {roomName, first, second}})
        })
        socket.on('getBattleUsers', ({first, second}: DataTypes.BattleCommunicationData) => {
            const user: UserTypes.User = store.getState().users.myUser
            if (first.username === user.username){
                dispatch(updateBattleUserOne({...first, health: 100, gold: 0}))
                dispatch(updateBattleUserTwo({...second, health: 100, gold: 0}))
            }else{
                dispatch(updateBattleUserOne({...second, health: 100, gold: 0}))
                dispatch(updateBattleUserTwo({...first, health: 100, gold: 0}))
            }
        })
        socket.on('attack', (val: DataTypes.BattleCommunicationData) => {
            const user: UserTypes.User = store.getState().users.myUser
            if (val.first.username === user.username){
                dispatch(updateBattleUserOne(val.first))
                dispatch(updateBattleUserTwo(val.second))
            }else{
                dispatch(updateBattleUserOne(val.second))
                dispatch(updateBattleUserTwo(val.first))
            }
        })
        socket.on('drinkPotion', (val: UserTypes.BattleUser) => {
            const user: UserTypes.User = store.getState().users.myUser
            if (val.username === user.username){
                dispatch(updateBattleUserOne(val))
            }else{
                dispatch(updateBattleUserTwo(val))
            }
        })
        socket.on('battleWon', (data: DataTypes.BattleCommunicationData) => {
            dispatch(updateBattleUserOne(data.first))
            dispatch(updateBattleUserTwo(data.second))
            dispatch(updateBattleWon({state: true, message: data.message}))
        })
        socket.on('userLeftPage', (val: string) => {
            dispatch(updateHasUserLeft({state: true, message: val}))
        })
        socket.on('setAttacker', (val: string) => {
            dispatch(updateAttacker(val))
        })
        socket.on('timer', (val: number) => {
            dispatch(updateAttackTime(val))
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

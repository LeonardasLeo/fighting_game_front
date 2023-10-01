import * as React from 'react';
import {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {socket} from "../App.jsx";
import Fighter from "../components/Fighter";
import {useDispatch, useSelector} from "react-redux";
import BattleWonDisplay from "../components/BattleWonDisplay";
import UserLeftModal from "../components/modals/userLeftModal";
import {ReduxUsers, ReduxOtherStates, UserType, BattleUser, CriticalCaseEvent} from "../features/types";
import {updateRoomName} from "../features/otherStates";

const ArenaPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {roomName, first, second} = location.state
    const user: UserType = useSelector((state: ReduxUsers) => state.users.myUser)
    const firstUser: BattleUser = useSelector((state: ReduxUsers) => state.users.userInBattleOne)
    const secondUser: BattleUser = useSelector((state: ReduxUsers) => state.users.userInBattleTwo)
    const isBattleWon: CriticalCaseEvent = useSelector((state: ReduxOtherStates) => state.otherStates.isBattleWon)
    const hasUserLeft: CriticalCaseEvent = useSelector((state: ReduxOtherStates) => state.otherStates.hasUserLeft)
    //this doesnt work on FireFox
    window.onbeforeunload = pageLeft
    window.onpopstate = pageLeft

    useEffect(() => {
        socket.emit('requestBattleUsers', {roomName, userOne: first, userTwo: second})
        dispatch(updateRoomName(roomName))
    },[])

    function attack () {
        socket.emit('requestAttack', {roomName, firstUser, secondUser})
    }

    function pageLeft() {
        socket.emit('pageReloaded', {roomName, firstUser, secondUser})
    }

    return (
        <div>
            {hasUserLeft.state && <UserLeftModal message={hasUserLeft.message}/>}
            <div className={hasUserLeft.state ? 'opacity' : ''}>
                {firstUser && secondUser &&
                    <div className='d-flex p-3'>
                        {firstUser.username === user.username ? <Fighter user={firstUser}/> : <Fighter user={secondUser}/>}
                        {isBattleWon.state ?
                            <BattleWonDisplay isBattleWon={isBattleWon} firstUser={firstUser}/>
                            :
                            <div className='d-flex align-items-center'>
                                <button className='btn btn-warning' onClick={attack}>Attack</button>
                            </div>
                        }
                        {firstUser.username === user.username ? <Fighter user={secondUser}/> : <Fighter user={firstUser}/>}
                    </div>
                }
            </div>
        </div>
    );
};

export default ArenaPage;
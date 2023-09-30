// @ts-ignore
import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {socket} from "../App.jsx";
import Fighter from "../components/Fighter.jsx";
import {useSelector} from "react-redux";
import BattleWonDisplay from "../components/BattleWonDisplay.jsx";
import UserLeftModal from "../components/modals/userLeftModal.jsx";
import {reduxUsers, reduxOtherStates, userType, battleUser, criticalCaseEvent} from "../features/types";

const ArenaPage = () => {
    const location = useLocation()
    const {roomName, first, second} = location.state
    const user: userType = useSelector((state: reduxUsers) => state.users.myUser)
    const firstUser: battleUser = useSelector((state: reduxUsers) => state.users.userInBattleOne)
    const secondUser: battleUser = useSelector((state: reduxUsers) => state.users.userInBattleTwo)
    const isBattleWon: criticalCaseEvent = useSelector((state: reduxOtherStates) => state.otherStates.isBattleWon)
    const hasUserLeft: criticalCaseEvent = useSelector((state: reduxOtherStates) => state.otherStates.hasUserLeft)
    //this doesnt work on FireFox
    window.onunload = pageReloaded

    useEffect(() => {
        socket.emit('requestBattleUsers', {roomName, first, second})
    },[])

    function attack () {
        socket.emit('requestAttack', {roomName, firstUser, secondUser})
    }

    function pageReloaded() {
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
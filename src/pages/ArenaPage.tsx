import * as React from 'react';
import {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {socket} from "../App.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    updateAttackTime,
    updateBattleWon,
    updateHasUserLeft,
    updateRoomName
} from "../features/otherStates";
import {DataTypes, ReduxTypes, UserTypes} from "../features/types";
import AttackDisplay from "../components/AttackDisplay";
import WaitingDisplay from "../components/WaitingDisplay";
import BattleWonDisplay from "../components/BattleWonDisplay";
import UserLeftModal from "../components/modals/userLeftModal";
import Fighter from "../components/Fighter";

const ArenaPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {roomName, first, second} = location.state
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxUsers) => state.users.myUser)
    const firstUser: UserTypes.BattleUser = useSelector((state: ReduxTypes.ReduxUsers) => state.users.userInBattleOne)
    const secondUser: UserTypes.BattleUser = useSelector((state: ReduxTypes.ReduxUsers) => state.users.userInBattleTwo)
    const isBattleWon: DataTypes.CriticalCaseEvent = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.isBattleWon)
    const hasUserLeft: DataTypes.CriticalCaseEvent = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.hasUserLeft)
    const attacker: string = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.attacker)

    window.onbeforeunload = pageLeft
    window.onpopstate = pageLeft

    useEffect(() => {
        socket.emit('requestBattleUsers', {roomName, userOne: first, userTwo: second})
        socket.emit('setWhoIsAttacking', {roomName, first, second, attacker})
        dispatch(updateRoomName(roomName))
        dispatch(updateHasUserLeft({state: false, message: null}))
        dispatch(updateBattleWon({state: false, message: null}))
    },[])



    function pageLeft() {
        socket.emit('pageLeft', {roomName, firstUser, secondUser})
        dispatch(updateAttackTime(20))
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
                                {attacker === socket.id
                                    ? <AttackDisplay roomName={roomName} first={first} second={second} attacker={attacker}/>
                                    : <WaitingDisplay/>
                                }
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
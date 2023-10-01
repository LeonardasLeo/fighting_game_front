import * as React from 'react';
import {useSelector} from "react-redux";
import {socket} from "../App";
import {ReduxTypes, UserTypes} from "../features/types";

type props = {
    roomName: string,
    first: string,
    second: string,
    attacker: string
}

const AttackDisplay = ({roomName, first, second, attacker}: props) => {
    const attackTime: number = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.attackTime)
    const firstUser: UserTypes.BattleUser = useSelector((state: ReduxTypes.ReduxUsers) => state.users.userInBattleOne)
    const secondUser: UserTypes.BattleUser = useSelector((state: ReduxTypes.ReduxUsers) => state.users.userInBattleTwo)
    function attack () {
        socket.emit('setWhoIsAttacking', {roomName, first, second, attacker})
        socket.emit('requestAttack', {roomName, firstUser, secondUser})
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <button className='btn btn-warning btn-lg' onClick={attack}>Attack ⚔️</button>
            <div className='mt-3'>You have {attackTime} secs left!</div>
        </div>
    );
};

export default AttackDisplay;
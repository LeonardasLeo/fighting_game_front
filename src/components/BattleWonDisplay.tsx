import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {battleUser, criticalCaseEvent} from "../features/types";

type props = {
    isBattleWon: criticalCaseEvent,
    firstUser: battleUser
}

const BattleWonDisplay = ({isBattleWon, firstUser}: props) => {
    const nav = useNavigate()
    function goBack () {
        nav('/main')
    }
    return (
        <div className='d-flex flex-column justify-content-center gap-3'>
            <div>{isBattleWon.message}</div>
            <div><b>Gold Won:</b> {firstUser.gold}</div>
            <button className='btn btn-secondary' onClick={goBack}>Go back</button>
        </div>
    );
};

export default BattleWonDisplay;
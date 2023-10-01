import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {BattleUser, CriticalCaseEvent} from "../features/types";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type props = {
    isBattleWon: CriticalCaseEvent,
    firstUser: BattleUser
}

const BattleWonDisplay = ({isBattleWon, firstUser}: props) => {
    const nav = useNavigate()
    function goBack () {
        nav('/main')
    }
    return (
        <div className='d-flex flex-column justify-content-center gap-3'>
            <div className='fs-4'>{isBattleWon.message}! 🥳</div>
            <div className='fs-4'><b>Won:</b> {firstUser.gold} <FontAwesomeIcon icon={faCoins} color='#DAA451FF' /></div>
            <button className='btn btn-secondary fs-4' onClick={goBack}>Go back</button>
        </div>
    );
};

export default BattleWonDisplay;
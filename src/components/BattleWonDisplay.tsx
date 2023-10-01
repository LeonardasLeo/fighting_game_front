import * as React from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DataTypes, UserTypes} from "../features/types";

type props = {
    isBattleWon: DataTypes.CriticalCaseEvent,
    firstUser: UserTypes.BattleUser
}

const BattleWonDisplay = ({isBattleWon, firstUser}: props) => {
    const nav: NavigateFunction = useNavigate()
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
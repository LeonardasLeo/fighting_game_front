import * as React from 'react';
import {useSelector} from "react-redux";
import {ReduxTypes} from "../features/types";

const WaitingDisplay = () => {
    const attackTime: number = useSelector((state: ReduxTypes.ReduxOtherStates) => state.otherStates.attackTime)

    return (
        <div className='d-flex flex-column align-items-center'>
            <div><b>Waiting for opponent to attack</b></div>
            <div>{attackTime}</div>
        </div>
    );
};

export default WaitingDisplay;
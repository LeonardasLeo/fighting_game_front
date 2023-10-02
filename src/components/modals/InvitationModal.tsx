import * as React from 'react';
import {socket} from "../../App.jsx";
import {updateInvitationModal} from "../../features/otherStates";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DataTypes, UserTypes} from "../../features/types";

const InvitationModal = ({data}: {data: DataTypes.InvitationReceived}) => {
    const dispatch = useDispatch()
    const nav: NavigateFunction = useNavigate()
    const userWhoSent: UserTypes.OnlineUser = data.from
    const turnModalOff = () => {
        dispatch(updateInvitationModal({state: false, data: undefined}))
    }

    function acceptInvitation() {
        turnModalOff()
        socket.emit('joinRoom', {roomName: data.roomName, id: socket.id})
        socket.emit('invitationAcceptedClient', {userWhoSent, roomName: data.roomName})
        nav('/arena', {state: {roomName: data.roomName, first: userWhoSent.socketId, second: socket.id}})
    }
    return (
        <div className='invitation-modal'>
            <div>Invitation from {userWhoSent.username} to battle</div>
            <div className='d-flex justify-content-around mt-3'>
                <button className='btn btn-success' onClick={acceptInvitation}>Accept</button>
                <button className='btn btn-danger' onClick={turnModalOff}>Reject</button>
            </div>
        </div>
    );
};

export default InvitationModal;
// @ts-ignore
import React from 'react';
import {socket} from "../../App.jsx";
import {updateInvitationModal} from "../../features/otherStates";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {invitationReceived} from "../../features/types";

const InvitationModal = ({data}: {data: invitationReceived}) => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const userWhoSent = data.from
    const turnModalOff = () => {
        dispatch(updateInvitationModal({state: false, data: undefined}))
    }

    function acceptInvitation() {
        turnModalOff()
        socket.emit('joinRoom', {roomName: data.roomName, id: socket.id})
        socket.emit('invitationAcceptedClient', {userWhoSent, roomName: data.roomName})
        nav('/arena', {state: {roomName: data.roomName, userOne: userWhoSent.socketId, userTwo: socket.id}})
    }
    return (
        <div className='invitationModal'>
            <div>Invitation from {userWhoSent.username} to battle</div>
            <div className='d-flex justify-content-between mt-2'>
                <button className='btn btn-success' onClick={acceptInvitation}>Accept</button>
                <button className='btn btn-danger' onClick={turnModalOff}>Reject</button>
            </div>
        </div>
    );
};

export default InvitationModal;
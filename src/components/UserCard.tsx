// @ts-ignore
import React from 'react';
import '../App.css'
import {socket} from "../App.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateError} from '../features/errors';
import {onlineUser, reduxUsers, userType} from "../features/types";

const UserCard = ({user}: {user: onlineUser}) => {
    const dispatch = useDispatch()
    const myUser: userType = useSelector((state: reduxUsers) => state.users.myUser)
    function invitePlayerToBattle (user) {
        if (myUser.selectedItems[0].tier !== undefined){
            const roomName = `${myUser.username}room`
            socket.emit('invitePlayer', {from: socket.id, to: user.socketId, roomName})
        }else{
            dispatch(updateError('You must select weapon to play'))
        }
    }
    return (
        <div className='userCard'>
            <img src={user.character} alt=""/>
            <div className='d-flex flex-column justify-content-between'>
                <b>{user.username}</b>
                {user.status === 'idle'
                    ? <button className='btn btn-success' onClick={() => invitePlayerToBattle(user)}>Invite to battle</button>
                    : <div>In Battle</div>
                }
            </div>
        </div>
    );
};

export default UserCard;
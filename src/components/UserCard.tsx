import * as React from 'react';
import {socket} from "../App.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateError} from '../features/error';
import {ReduxTypes, UserTypes} from "../features/types";
import '../App.css'


const UserCard = ({user}: {user: UserTypes.OnlineUser}) => {
    const dispatch = useDispatch()
    const myUser: UserTypes.User = useSelector((state: ReduxTypes.ReduxUsers) => state.users.myUser)
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
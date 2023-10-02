import * as React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ReduxTypes, UserTypes} from "../features/types";

const Navbar = () => {
    const nav: NavigateFunction = useNavigate()
    const user: UserTypes.User = useSelector((state: ReduxTypes.ReduxUsers) => state.users.myUser)
    const error:string = useSelector((state: ReduxTypes.ReduxErrorStates) => state.errors.error)

    function logout () {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        nav('/login')
    }
    return (
        <nav className='d-flex flex-lg-row flex-column-reverse justify-content-between align-items-lg-center fs-5'>
            <div><FontAwesomeIcon icon={faCoins} color='#DAA451FF' /> {user.money}</div>
            <div className='fs-3' style={{color: 'red'}}><b>{error}</b></div>
            <div className='d-flex align-items-center justify-content-between gap-5'>
                <div>
                    <b>Logged in as:</b> {user.username}
                </div>
                <button className='btn btn-secondary' onClick={logout}>Log out</button>
            </div>
        </nav>
    );
};

export default Navbar;
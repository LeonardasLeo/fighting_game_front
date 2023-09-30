import * as React from 'react';
import {useNavigate} from "react-router-dom";

const UserLeftModal = ({message}: {message: string}) => {
    const nav = useNavigate()
    return (
        <div className='invitationModal d-flex flex-column align-items-center gap-3'>
            {message}
            <button className='btn btn-secondary' onClick={() => nav('/main')}>Go back to home page</button>
        </div>
    );
};

export default UserLeftModal;
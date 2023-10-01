import * as React from "react";
import {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const nav = useNavigate()
    const usernameRef:React.MutableRefObject<HTMLInputElement>= useRef()
    const passwordRef:React.MutableRefObject<HTMLInputElement>= useRef()
    const [autoLogin, setAutoLogin] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    async function login () {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        const response = await fetch('http://192.168.1.147:3001/login', options)
        const data = await response.json()

        if (!data.error){
            nav('/main')
            if (autoLogin){
                localStorage.setItem('token', data.data.token)
            }else{
                sessionStorage.setItem('token', data.data.token)
            }
        }else{
            setError(data.message)
        }
    }
    return (
        <div className='p-3'>
            <div>
                <button className='btn btn-dark' onClick={() => nav('/')}>Register</button>
            </div>
            <div className='d-flex flex-column gap-2 p-5'>
                <input type="text" placeholder='Username' ref={usernameRef}/>
                <input type="text" placeholder='Password' ref={passwordRef}/>
                <div>
                    <input type="checkbox" onChange={() => setAutoLogin(!autoLogin)}/> Keep me logged in
                </div>
                <button className='btn btn-primary' onClick={login}>Login</button>
                <div style={{color: 'red'}}><b>{error}</b></div>
            </div>
        </div>
    );
};

export default LoginPage;
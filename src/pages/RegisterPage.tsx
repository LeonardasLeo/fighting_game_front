// @ts-ignore
import * as React from "react";
import {useEffect, useRef, useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import '../App.css'
import CharacterSelect from "../components/CharacterSelect.jsx";
import {GameTypes} from "../features/types";
import config from '../config'
const RegisterPage = () => {
    const serverRoute: string = config.serverRoute
    const nav: NavigateFunction = useNavigate()
    const usernameRef:React.MutableRefObject<HTMLInputElement> = useRef()
    const password:React.MutableRefObject<HTMLInputElement> = useRef()
    const passwordTwo:React.MutableRefObject<HTMLInputElement> = useRef()
    const [character, setCharacter] = useState<string>('')
    const [characters, setCharacters] = useState<GameTypes.Character[]>([])
    const [error, setError] = useState<string>('')
    useEffect(() => {
        fetch(`${serverRoute}/getCharacters`)
            .then(res => res.json())
            .then(data => setCharacters(data.data))
    }, [])
    async function register () {
        const user = {
            username: usernameRef.current.value,
            character: character,
            passOne: password.current.value,
            passTwo: passwordTwo.current.value
        }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        const response = await fetch(`${serverRoute}/register`, options)
        const data = await response.json()
        if (!data.error) nav('/login')
        else setError(data.message)
    }

    return (
        <div className='p-3'>
            <div>
                <button className='btn btn-dark' onClick={() => nav('/login')}>Login</button>
            </div>
            <div className='d-flex flex-column gap-1 p-5'>
                <div className='d-flex flex-wrap gap-3'>
                    {characters.map((item: GameTypes.Character) => <CharacterSelect key={item.image} character={character} setCharacter={setCharacter} item={item}/>)}
                </div>
                <div className='d-flex flex-column gap-2 mt-3'>
                    <input type="text" placeholder='Username' ref={usernameRef}/>
                    <input type="text" placeholder='Password' ref={password}/>
                    <input type="text" placeholder='Repeat password' ref={passwordTwo}/>
                    <button className='btn btn-primary' onClick={register}>Register</button>
                    <div style={{color: 'red'}}><b>{error}</b></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
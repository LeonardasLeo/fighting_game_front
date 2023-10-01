// @ts-ignore
import * as React from "react";
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css'
import CharacterSelect from "../components/CharacterSelect.jsx";
import {Character} from "../features/types";
const RegisterPage = () => {
    const nav = useNavigate()
    const usernameRef:React.MutableRefObject<HTMLInputElement> = useRef()
    const password:React.MutableRefObject<HTMLInputElement> = useRef()
    const passwordTwo:React.MutableRefObject<HTMLInputElement> = useRef()
    const [character, setCharacter] = useState<string>('')
    const [characters, setCharacters] = useState<Character[]>([])
    useEffect(() => {
        fetch('http://192.168.1.147:3001/getCharacters')
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
        const response = await fetch('http://192.168.1.147:3001/register', options)
        const data = await response.json()
        if (!data.error) nav('/login')
        else console.log(data)
    }

    return (
        <div className='p-3'>
            <div>
                <button className='btn btn-dark' onClick={() => nav('/login')}>Login</button>
            </div>
            <div className='d-flex flex-column gap-1 p-5'>
                <div className='d-flex flex-wrap gap-3'>
                    {characters.map(item => <CharacterSelect key={item.image} character={character} setCharacter={setCharacter} item={item}/>)}
                </div>
                <div className='d-flex flex-column gap-2 mt-3'>
                    <input type="text" placeholder='Username' ref={usernameRef}/>
                    <input type="text" placeholder='Password' ref={password}/>
                    <input type="text" placeholder='Repeat password' ref={passwordTwo}/>
                    <button className='btn btn-primary' onClick={register}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
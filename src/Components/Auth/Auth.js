import React from 'react';
import {useState} from 'react';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let login = () => {
        axios.post('/api/auth/login', {username: username, password: password}).then(res => {
            //props.getUser(res.data)
            //props.history.push('/home')
        })
    }

    return (
        <div className='auth'>
            <label>Username:</label>
            <input 
                value={username}
                type='email'
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>Password:</label>
            <input 
                value={password}
                type='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
            <button>Register</button>
        </div>
    )
}

export default Auth;
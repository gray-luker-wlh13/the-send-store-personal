import React from 'react';
import './Scss/auth.scss';
import {useState} from 'react';
import logo from '../../LogoMakr-9WvHiZ-300dpi.png';
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
           <div className='auth-container'>
               <img src={logo} alt='logo'/>
                <div className='input-container'>
                    <label>Username:</label>
                    <input 
                        value={username}
                        type='email'
                        placeholder='Enter Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label>Password:</label>
                    <input 
                        value={password}
                        type='password'
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='buttons'>
                    <button onClick={login}>Login</button>
                    <label>or</label>
                    <button>Register</button>
                </div>
           </div>
        </div>
    )
}

export default Auth;
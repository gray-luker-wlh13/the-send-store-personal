import React from 'react';
import './Scss/auth.scss';
import {connect} from 'react-redux';
import {getConsumer} from '../../redux/reducers/getConsumerReducer';
import {useState} from 'react';
import logo from '../../img/LogoMakr-9WvHiZ-300dpi.png';
import axios from 'axios';

const Auth = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [profile_img, setProfileImg] = useState('');
    const [favorite_climb, setClimb] = useState('');
    const [clicked, setClick] = useState(false);


    let login = () => {
        axios.post('/api/auth/login', {username: username, password: password}).then(res => {
            props.getConsumer(res.data)
            props.history.push('/home')
            console.log(res.data)
        })
    }

    let register = () => {
        axios.post('/api/auth/register', {
            profile_img: profile_img,
            username: username,
            password: password,
            favorite_climb: favorite_climb
        }).then(res => {
            props.getConsumer(res.data)
            props.history.push('/home')
        })
    }

    return (
        <div className='auth'>
           {!clicked ? (
                <div className='login'>
                <img src={logo} alt='logo'/>
                    <div className='login-container'>
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
                            <div id='main-button'>
                                <button onClick={login}>Login</button>
                            </div>
                            <br/>
                            <div id='other-button'>
                                <p className='auth-p'>or register as a user here:</p>
                                <button onClick={() => setClick(!clicked)}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
               <div className='register'>
                   <img src={logo} alt='logo'/>
                   <div className='register-container'>
                       <div id='profile-display'>
                           <img src={profile_img ? profile_img : 'https://spacenews.com/wp-content/plugins/events-calendar-pro/src/resources/images/tribe-event-placeholder-image.svg'} alt='profile-pic'/>
                       </div>
                       <div className='input-container'>
                           <label>Profile Picture</label>
                           <input 
                                value={profile_img}
                                type='url'
                                placeholder='Profile Picture URL'
                                onChange={(e) => setProfileImg(e.target.value)}
                           />
                       </div>
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
                       <div className='input-container'>
                            <label>Favorite Climb:</label>
                            <input 
                                value={favorite_climb}
                                type='text'
                                placeholder='Favorite Climb...'
                                onChange={(e) => setClimb(e.target.value)}
                            />
                       </div>
                       <div className='register-buttons'>
                       <div id='main-register-button'>
                                <button onClick={register}>Register</button>
                            </div>
                            <br/>
                            <div id='other-register-button'>
                                <p className='auth-p'>or register as a user here:</p>
                                <button onClick={() => setClick(!clicked)}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default connect(null, {getConsumer})(Auth);
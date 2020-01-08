import React, {useState} from 'react';
import './Scss/auth.scss';
import {connect} from 'react-redux';
import {getConsumer} from '../../redux/reducers/getConsumerReducer';
import logo from '../../img/LogoMakr-9WvHiZ-300dpi.png';
import axios from 'axios';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';

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
            // console.log(res.data)
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

    let getSignedRequest = ([file]) => {
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(res => {
            const {signedRequest, url} = res.data;
            uploadFile(file, signedRequest, url);
        })
        .catch(err => {console.log(err)})
  };

    let uploadFile = (file, signedRequest, url) => {
        const options = {
        headers: {
            'Content-Type': file.type,
        },
        };

        axios.put(signedRequest, file, options).then(res => {
            setProfileImg(url);
        })
        .catch(err => {
            if (err.res.status === 403) {
            alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                err.stack
                }`
            );
            } else {
            alert(`ERROR: ${err.status}\n ${err.stack}`);
        }   
        });
    };

    // console.log(profile_img);

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
                           <label>Profile Picture:</label>
                           <Dropzone
                            onDropAccepted={getSignedRequest}
                            accept='image/*'
                            multiple={false}
                           >
                            {({getRootProps, getInputProps}) => (
                                <div className="container">
                                    <div
                                        {...getRootProps({
                                        className: 'dropzone',
                                        onDrop: event => event.stopPropagation()
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        <p>Drop files here, or click to select files</p> 
                                    </div>
                                </div>
                            )}  
                           </Dropzone>
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
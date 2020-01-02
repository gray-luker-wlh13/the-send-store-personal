import React from 'react';
import axios from 'axios';
import './Scss/profile.scss';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducers/getConsumerReducer';

const Profile = (props) => {
    let logout = () => {
        axios.post('/api/auth/logout').then(res => {
            props.logout(res.data)
            props.history.push('/')
        })
    }

    
    const {consumer} = props.consumer;
    console.log(props);
    return(
        <div className='profile-container'>
            <div className='profile'>
                <img src={consumer.profile_img} alt='profile-img'/>
                <h3>{consumer.username}</h3>
                <div className='favorite-climb'>
                    <label>Favorite Climb:</label><div>{consumer.favorite_climb}</div>
                </div>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        consumer: reduxState.consumer
    }
}

export default connect(mapStateToProps, {logout})(Profile);
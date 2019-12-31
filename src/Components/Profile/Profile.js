import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducers/getConsumerReducer';

const Profile = (props) => {
    let logout = () => {
        axios.post('/api/auth/logout').then(res => {
            props.logout(res.data)
        })
    }

    return(
        <div className='profile-container'>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        consumer: reduxState.consumer
    }
}

export default connect(mapStateToProps, {logout})(Profile);
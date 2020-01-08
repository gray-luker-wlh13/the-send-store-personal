import React from 'react';
import './Scss/otherProfile.scss';
import axios from 'axios';
import {connect} from 'react-redux';

const OtherProfile = (props) => {
    return (
        <div className='other-user-container'>
            Other User
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return {
        products: reduxState.products
    }
}

export default connect(mapStateToProps)(OtherProfile);
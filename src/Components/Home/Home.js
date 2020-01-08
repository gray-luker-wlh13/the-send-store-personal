import React from 'react';
import './Scss/home.scss';
import Products from '../Products/Products';
import Search from './Search/Search';
import {connect} from 'react-redux';


const Home = (props) => {

    console.log(props.search.searchClicked)
    return(
        <div className='home'>
            {props.search.searchClicked ? (
                <>
                    <Search />
                </>
            ) : (
                <>
                    <Products />
                </>
            )}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Home);
import React from 'react';
import './Scss/home.scss';
import Products from '../Products/Products';
import Search from './Search/Search';
import {connect} from 'react-redux';
import Fade from 'react-reveal/Fade'


const Home = (props) => {

    // console.log(props.search.searchClicked)
    return(
        <div className='home'>
            {props.search.searchClicked ? (
                <>
                    <Search />
                </>
            ) : (
                <>
                    <Fade right delay={100} duration={1000}>
                        <Products />
                    </Fade>
                </>
            )}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Home);
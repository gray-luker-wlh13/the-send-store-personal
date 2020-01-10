import React, {useEffect} from 'react';
import './App.scss';
import {withRouter} from 'react-router-dom';
import routes from './routes';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import axios from 'axios';
import {connect} from 'react-redux';
import {getConsumer} from '../src/redux/reducers/getConsumerReducer';


function App(props) {
  useEffect(() => {
    axios.get('/api/consumer').then(res => {
      props.getConsumer(res.data)
    })
  })

  return (
    <div className="App">
      {props.location.pathname === '/'
      ? (
        <>
          {routes}
        </>
      ) : (
        <>
          <Header />
          {routes}
          <Footer />
        </>
      )}
      {/* <Header/>
      {routes} */}
    </div>
  );
}

export default withRouter(connect(null, {getConsumer})(App));
import React from 'react';
import './App.scss';
import {withRouter} from 'react-router-dom';
import routes from './routes';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';


function App(props) {
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

export default withRouter(App);
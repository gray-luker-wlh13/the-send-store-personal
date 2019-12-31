import React from 'react';
import './App.scss';
import {withRouter} from 'react-router-dom';
import routes from './routes';
import Header from './Components/Header/Header';

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
        </>
      )}
      {/* <Header/>
      {routes} */}
    </div>
  );
}

export default withRouter(App);
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Profile from './Components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/home' component={Home}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
);
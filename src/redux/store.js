import {createStore} from 'redux';
import getConsumerReducer from './reducers/getConsumerReducer';

export default createStore(getConsumerReducer);
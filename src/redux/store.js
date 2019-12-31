import {createStore, combineReducers} from 'redux';
import getConsumerReducer from './reducers/getConsumerReducer';
import getProductsReducer from './reducers/getProductsReducer';

const rootReducer = combineReducers({
    consumer: getConsumerReducer,
    products: getProductsReducer
})

export default createStore(rootReducer);

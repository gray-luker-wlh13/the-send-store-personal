import {createStore, combineReducers} from 'redux';
import getConsumerReducer from './reducers/getConsumerReducer';
import getProductsReducer from './reducers/getProductsReducer';
import searchReducer from'./reducers/searchReducer';

const rootReducer = combineReducers({
    consumer: getConsumerReducer,
    products: getProductsReducer,
    search: searchReducer
})

export default createStore(rootReducer);

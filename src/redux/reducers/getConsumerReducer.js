const initialState = {
    consumer: {}
}

const GET_CONSUMER = 'GET_CONSUMER';
const LOG_OUT = 'LOG_OUT';

export function getConsumer(consumerObj){
    return {
        type: GET_CONSUMER,
        payload: consumerObj
    }
};

export function logout(){
    return {
        type: LOG_OUT,
        payload: null
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CONSUMER:
            return {...state, consumer: payload}
            
        case LOG_OUT:
            return {...state, consumer: payload}
            
        default:
            return state;
    }
};
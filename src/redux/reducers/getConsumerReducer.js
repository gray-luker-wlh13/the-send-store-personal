const initialState = {
    consumer: {}
}

const GET_CONSUMER = 'GET_CONSUMER';

export function getConsumer(consumerObj){
    return {
        type: GET_CONSUMER,
        payload: consumerObj
    }
};

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CONSUMER:
            return {...state, consumer: payload}
            
        default:
            return state;
    }
};
const initialState = {
    products: []
}

const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts(productsObj){
    return {
        type: GET_PRODUCTS,
        payload: productsObj
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PRODUCTS:
            return {...state, products: payload}

        default:
            return state;
    }
}
const initialState = {
    searchClicked: false
}

const TOGGLE_SEARCH = 'TOGGLE_SEARCH';
const CANCEL_TOGGLE = 'CANCEL_TOGGLE';

export function toggleSearch(){
    return {
        type: TOGGLE_SEARCH,
        payload: true
    }
}

export function cancelToggle(){
    return {
        type: CANCEL_TOGGLE,
        payload: false
    }
}

export default function search(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case TOGGLE_SEARCH:
            return {...state, searchClicked: payload}
        
        case CANCEL_TOGGLE:
            return {...state, searchClicked: payload}

        default:
            return state;
    }
}
import {
    SET_ROUTE,
} from '../types'

const INITIAL_STATE = {
    route: []
}

export default function programs(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_ROUTE:
            return {...state, route: action.payload}
        default:
            return state
    }
}
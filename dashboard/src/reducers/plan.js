import {initialState} from '../store/initialState'

export default (state = initialState.apikeys, action) => {
    switch (action.type) {
        case 'Add':
            return [...state,action.payload]
        default:
            return state
        }
}
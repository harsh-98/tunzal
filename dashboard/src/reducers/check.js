import {initialState} from '../store/initialState'

export default (state = initialState.check, action) => {
    switch (action.type) {
        case 'SETCHECK':
            return action.response
        default:
            return state
        }
}
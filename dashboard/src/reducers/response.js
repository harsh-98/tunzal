import {initialState} from '../store/initialState'

export default (state = initialState.response, action) => {
    switch (action.type) {
        case 'SETRESPONSE':
            return action.response
        default:
            return state
        }
}
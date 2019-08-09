import {initialState} from '../store/initialState'

export default (state = initialState.refund, action) => {
    switch (action.type) {
        case 'SETREFUND':
            return action.response
        default:
            return state
        }
}
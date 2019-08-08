import {initialState} from '../store/initialState'

export default (state = initialState.response, action) => {
    switch (action.type) {
        case 'PURCHASEPLAN':
            return action.response
        default:
            return state
        }
}
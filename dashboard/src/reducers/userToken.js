import {initialState} from '../store/initialState'

export default (state = initialState.userToken, action) => {
    switch (action.type) {
        case 'SETUSERTOKENS':
            return action.response
        default:
            return state
        }
}
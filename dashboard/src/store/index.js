import {createStore, combineReducers} from 'redux'
import {initialState} from './initialState'
import apikeys from '../reducers/apikeys'
import plans from '../reducers/plan'
import response from '../reducers/response'
import userSession from '../reducers/userSession'


const reducer = combineReducers({
    apikeys,
    plans,
    response,
    userSession
});

let store = createStore(reducer, initialState)

export default store;
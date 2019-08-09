import {createStore, combineReducers} from 'redux'
import {initialState} from './initialState'
import apikeys from '../reducers/apikeys'
import plans from '../reducers/plan'
import response from '../reducers/response'
import userSession from '../reducers/userSession'
import refund from '../reducers/refund'
import check from '../reducers/check'
import userToken from '../reducers/userToken'


const reducer = combineReducers({
    apikeys,
    plans,
    response,
    userSession,
    userToken,
    check,
    refund
});

let store = createStore(reducer, initialState)

export default store;
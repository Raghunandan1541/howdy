import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import socket from './socketReducer'
import peer from './peerReducer'
import message from './messageReducer'


export default combineReducers({
    auth,
    alert,
    socket,
    peer,
    message
})
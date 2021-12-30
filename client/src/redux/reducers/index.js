import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import access from './accessReducer'
import chatlist from './chatlistReducer'
import socket from './socketReducer'

export default combineReducers({
	auth,
	alert,
	access,
	chatlist,
	socket
})
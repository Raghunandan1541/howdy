import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MESS_TYPES } from './redux/actions/messageAction'


const SocketClient = () => {
	const { auth, socket  } = useSelector(state => state)
	const dispatch = useDispatch()

	// joinUser
	useEffect(() => {
		socket.emit('joinUser', auth.user)
	},[socket, auth.user])

	// Message
	useEffect(() => {
		socket.on('addMessageToClient', msg =>{
			dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})

			dispatch({
				type: MESS_TYPES.ADD_USER, 
				payload: {
					...msg.user, 
					text: msg.text, 
					media: msg.media
				}
			})
		})

		return () => socket.off('addMessageToClient')
	},[socket, dispatch])




	return (
		<React.Fragment></React.Fragment>
	)
}

export default SocketClient

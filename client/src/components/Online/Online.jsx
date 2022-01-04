import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

function Online() {
	const [onlineUsers, setOnlineUsers] = useState('')

	const socket = useRef()
	const {auth, chatwith} = useSelector(state => state)

	useEffect(() => {
		socket.current = io('ws://localhost:8900')
	}, [])
	
	useEffect(() => {
		socket.current.emit('addUser', auth.user._id)
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(
				'online'
			);
		});
	}, [auth])

	return (
		<div>
			{onlineUsers}
		</div>
	)
}

export default Online

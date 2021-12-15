let users = []


const SocketServer = (socket) => {
	// Connect - Disconnect
	socket.on('joinUser', user => {
		users.push({id: user._id, socketId: socket.id})
	})


	// Message
	socket.on('addMessage', msg => {
		const user = users.find(user => user.id === msg.recipient)
		user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
	})


}

module.exports = SocketServer
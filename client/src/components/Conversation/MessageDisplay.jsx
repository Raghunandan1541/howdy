import React from 'react'

function MessageDisplay({user, msg, msgs}) {
	return (
		<>
			<div className="chat__title">
				<span>{user.username}</span>
			</div>

			<div className="you__content">
				{
					msg.text && 
					<div className="chat__text">
						{msg.text}
					</div>
				}
			</div>

			<div className="chat__time">
				{new Date(msg.createdAt).toLocaleString()}
			</div>
		</>
	)
}

export default MessageDisplay


function MessageDisplay({ message, own }) {

	return (
		<div className={own ? 'messages sender' : 'messages'}>
			{message.text}
		</div>
	)
}

export default MessageDisplay

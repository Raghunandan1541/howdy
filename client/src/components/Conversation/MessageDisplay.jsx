
import { format } from 'timeago.js'

function MessageDisplay({ message, own, scrollRef }) {

	return (
		<div ref={scrollRef} className="msg__container">
			<div className={own ? 'messages sender' : 'messages'} >
				{message.text}
			</div>
			<div className={own ? 'timer sender__timer' : 'timer'} >
				{format(message.createdAt)}
			</div>
		</div>
	)
}

export default MessageDisplay

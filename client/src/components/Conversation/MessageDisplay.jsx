import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function MessageDisplay({ message }) {

	const {auth} = useSelector(state => state)
	const [own, setOwn] = useState(false)

	useEffect(() => {
		setOwn(message.sender === auth.user._id)
	}, [auth.user._id])

	return (
		<div className={own ? 'messages own' : 'messages'}>
			{message.text}
		</div>
	)
}

export default MessageDisplay

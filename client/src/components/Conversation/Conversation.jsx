import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import './conversation.css'
import MessageDisplay from './MessageDisplay'

function Conversation() {

	const [text, setText] = useState('')
	const [messages, setMessages] = useState([])
	const { access, chatlist } = useSelector(state => state)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if(!text.trim()) return;
		setText('')
	}


	useEffect(() => {
		chatlist.map(newId => {
			const getMessages = async () => {
				try{
					const res = await axios.get(`/api/messages/${newId}`)
					setMessages(res.data)
				} catch (err) {
					console.log(err)
				}
			}
			getMessages()
		})
	}, [chatlist])

	console.log(messages)


	return (
		<div className='conversations'>
			{ access ? 
				<Fragment>
					<div className='msg__container'>
						{messages.map((msg, index) => {
							return <MessageDisplay key={index} message={msg} />
						})}
					</div>
					
					<form onSubmit={handleSubmit}>
						<input 
							type='text' 
							placeholder='Send message on enter' 
							className='chat__input' 
							value={text} 
							onChange={e => setText(e.target.value)}
						/>
						<button type="submit" className="send_logo" 
						disabled={text ? false : true}>
						</button>
					</form>
				</Fragment>
				: <span className='noConversation' >Open a conversation in Chats to start a chat.</span>
			}
			
		</div>
	)
}

export default Conversation;

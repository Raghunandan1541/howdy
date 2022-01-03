import { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { format } from 'timeago.js'

import './conversation.css'
import MessageDisplay from './MessageDisplay'

function Conversation() {

	const [newMessage, setNewMessage] = useState('')
	const [messages, setMessages] = useState([])

	const { auth, access, chatwith, friend } = useSelector(state => state)
	const scrollRef = useRef()

	useEffect(() => {
		chatwith.map((newId) => {
			const getMessages = async () => {
				try{
					if(newId.members[1] === friend) {
						const res = await axios.get(`/api/messages/${newId._id}`)
						setMessages(res.data)
					}
				} catch (err) {
					console.log(err)
				}
			}
			getMessages()
		})
	}, [chatwith, friend])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault()

		const cId = chatwith
			.filter(newId => (newId.members[1] === friend) ? newId._id : '' )
			.map(id => id._id)

		const message = {
			sender: auth.user._id,
			text: newMessage,
			conversationId: cId[0],
		}

		const receiverId = chatwith.members.find(
			(member) => member !== auth.user._id
		);

		console.log(receiverId)
	  
		// socket.current.emit("sendMessage", {
		// 	senderId: auth.user._id,
		// 	receiverId,
		// 	text: newMessage,
		// });

		try {
			const res = await axios.post("/api/messages", message);
			setMessages([...messages, res.data]);
			setNewMessage("");
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='conversations'>
			{ access ? 
				<Fragment>
					<div className='contain__messages'>
						{messages.map((msg, index) => {
							return (
								<div ref={scrollRef} key={index} className="msg__container">
									<MessageDisplay 
										own={msg.sender === auth.user._id} 
										message={msg} 
									/>
									<div 
										className={(msg.sender === auth.user._id) ? 
										'timer sender__timer' : 'timer'}
									>
										{format(msg.createdAt)}
									</div>
								</div>
							)
						})}
					</div>
					
					<form onSubmit={handleSubmit}>
						<input 
							type='text' 
							placeholder='Send message on enter' 
							className='chat__input' 
							value={newMessage} 
							onChange={e => setNewMessage(e.target.value)}
						/>
						<button type="submit" className="send_logo" 
						disabled={newMessage ? false : true}>
						</button>
					</form>
				</Fragment>
				: <span className='noConversation' >Open a conversation in Chats to start a chat.</span>
			}
			
		</div>
	)
}

export default Conversation;

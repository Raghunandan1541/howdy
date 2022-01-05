import { useState, useEffect, Fragment, useRef } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {io} from 'socket.io-client'

import './conversation.css'
import MessageDisplay from './MessageDisplay'

function Conversation() {

	const [newMessage, setNewMessage] = useState('')
	const [messages, setMessages] = useState([])
	const [arrivalMessage, setArrivalMessage] = useState(null)

	const { auth, access, chatwith, friend } = useSelector(state => state)
	const scrollRef = useRef()
	const socket = useRef()
	
	useEffect(() => {
		socket.current = io('ws://localhost:8900');

		socket.current.on("getMessage", ({senderId, text}) => {
			setArrivalMessage({
				sender: senderId,
				text: text,
				createdAt: Date.now(),
			});
			console.log('message got')
		});

	}, [])

	useEffect(() => {
		arrivalMessage &&
		chatwith.map(data => data.members).includes(arrivalMessage.sender) &&
		setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, chatwith]);

	useEffect(() => {
		chatwith.map((newId) => {
			const getMessages = async () => {
				try{
					if(newId.members.includes(friend)) {
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
			.filter(newId => (newId.members.includes(friend)) ? newId._id : '' )
			.map(id => id._id)

		const message = {
			sender: auth.user._id,
			text: newMessage,
			conversationId: cId[0],
		}

		const receiverId = chatwith.map(data => data.members.includes(friend))[0]
		console.log(receiverId)
		
	  
		socket.current.emit("sendMessage", {
			senderId: auth.user._id,
			receiverId,
			text: newMessage,
		});

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
									<MessageDisplay
										scrollRef={scrollRef} 
										key={index} 
										own={msg.sender === auth.user._id} 
										message={msg} 
									/>
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

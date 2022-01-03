import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import { access } from '../../redux/actions/accessAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import './chat.css';
import Conversation from './ConversationDisplay';

function ChatList() {

	const [chatContacts, setChatContacts] = useState([]);
	const {auth} = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(`/api/conversations/${auth.user._id}`)
				setChatContacts(res.data)
				dispatch({
					type: GLOBALTYPES.CONVERSATIONS,
					payload: res.data
				})
			} catch (error) {
				console.log(error)
			}
		}
		
		getConversations();
	}, [auth.user._id, dispatch])

	return (
		<div className="chat__list">
			{chatContacts.map((resp, index) => {
				return (
					<div key={index} onClick={() => dispatch(access(true))}>
						<Conversation list={resp} currUser={auth.user._id} />
					</div>
				)
			})}
		</div>
	);
}

export default ChatList;

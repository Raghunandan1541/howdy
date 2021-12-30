import axios from 'axios';
import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'

import './chat.css'
import { getchatusers } from '../../redux/actions/chatlistAction';

function Conversation({list, currUser}) {

	const [user, setUser] = useState(null)
	const dispatch = useDispatch()

	
	useEffect(() => {

		const friendId = list.members.find((id) => {
			return id !== currUser
		});

		const getUser = async () => {
			try {
				const res = await axios(`/api/user?userId=${friendId}`);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getUser();
	}, [currUser, list])

	const handleClick = () => {
		dispatch(getchatusers(currUser))
	}

	return (
		<div className='list__design' onClick={handleClick} >
			{user?.username}
		</div>
	)
}

export default Conversation

import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { chatlist } from '../../redux/actions/chatlistAction'
import List from '../Home/List'

function Contact() {

	const [contacts, setContacts] = useState(null)

	const dispatch = useDispatch()
	const {auth} = useSelector(state => state)

	useEffect(() => {
		axios.get('/api/users')
			.then(res => {
				return res;
			})
			.then(result => {
				setContacts(result.data.user);
			})
			.catch(err => {
				return err;
			})
	}, [])
	
	const handleClick = (e) => {
		e.preventDefault()
		const userData = {
			senderId: auth.user._id,
			receiverId: e.target.getAttribute('data_id')
		}
		dispatch(chatlist(userData));
	}
	
	return (
		<React.Fragment>
			{contacts && <List list={contacts} click={handleClick} />}
		</React.Fragment>
	)
}

export default Contact

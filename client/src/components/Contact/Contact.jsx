import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import List from './ListDisplay'
import './contact.css'

function Contact() {

	const [contacts, setContacts] = useState(null)

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
	
	const handleSubmit = async (e) => {
		e.preventDefault()

		const userData = {
			senderId: auth.user._id,
			receiverId: e.target.getAttribute('data_id')
		}
		
		try {
			await axios.post('/api/conversations', userData)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<React.Fragment>
			{contacts && contacts.map((list, index) => {
				return (list._id !== auth.user._id ) ? 
					<div key={index}>
						<List list={list} click={handleSubmit} />
					</div> 
					: ''}
			)}
		</React.Fragment>
	)
}

export default Contact

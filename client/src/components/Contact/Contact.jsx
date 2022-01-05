import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

import List from './ListDisplay'
import './contact.css'
import { filtered } from '../../utils/filtered'

function Contact() {

	const [contacts, setContacts] = useState(null)
	const [exists, setExists] = useState(true)

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

	useEffect(() => {
	}, [auth])
	
	const handleSubmit = async (e) => {
		e.preventDefault()

		let receiverId = e.target.getAttribute('data_id');

		const userData = {
			senderId: auth.user._id,
			receiverId,
		}
		
		const getFriend = async () => {
			const res = await axios.get(`/api/conversations/${auth.user._id}`)
			const val = filtered(res.data)
			setExists(val.map(id => id.includes(receiverId))[0])
		}
		getFriend();
		
		try {
			if(!exists) {
				await axios.post('/api/conversations', userData)
			} else {
				console.log('user does not Exist')
			}
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

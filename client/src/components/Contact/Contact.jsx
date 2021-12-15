import axios from 'axios'
import React, {useEffect, useState} from 'react'
import List from '../Home/List'

function Contact() {

	const [list, setList] = useState(null)

	useEffect(() => {
		axios.get('/api/users')
			.then(res => {
				return res;
			})
			.then(result => {
				// console.log(result.data.user)
				setList(result.data.user);
			})
			.catch(err => {
				return err;
			})
	}, [])
	
	return (
		<React.Fragment>
			{list && <List list={list} />}
		</React.Fragment>
	)
}

export default Contact

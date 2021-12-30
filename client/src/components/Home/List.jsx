import React from 'react'
import {useSelector} from 'react-redux'

import './home.css'

function List({list, click}) {

	const {auth} = useSelector(state => state)

	return (
		<div>
			{list.map((user, index) => {

				return (
				user._id !== auth.user._id ?
					<div className='list__design' key={index} onClick={click} value={user.username} data_id={user._id}>
						{user.username}
					</div> : ''
				)
			})}
		</div>
	)
}

export default List

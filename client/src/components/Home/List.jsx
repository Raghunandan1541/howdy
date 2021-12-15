import React from 'react'
import './home.css'

function List({list}) {
	return (
		<div>
			{list.map((user, index) => {
				return <div className='list__design' key={index}>
					{user.username}
				</div>
			})}
		</div>
	)
}

export default List

import React from 'react'
import { useState } from 'react'

import './conversation.css'

function Conversation() {

	const [text, setText] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		if(!text.trim()) return;
		setText('')
	}


	return (
		<div className='conversations'>
			<form onSubmit={handleSubmit}>
				<input 
					type='text' 
					placeholder='Send message on enter' 
					className='chat__input' 
					value={text} 
					onChange={e => setText(e.target.value)}
				/>
				<button type="submit" className="send_logo" 
				disabled={text ? false : true}>
				</button>
			</form>
			
		</div>
	)
}

export default Conversation;

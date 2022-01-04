import React, { useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {io} from 'socket.io-client'

import Sidebar from './Sidebar'
import Conversation from '../Conversation/Conversation'

import './home.css'
import '../Navbar/navbar.css'
import {logout} from '../../redux/actions/authAction'
import Instruction from './Instruction';

function Home() {

	const dispatch = useDispatch();

	const socket = useRef()
	const {auth} = useSelector(state => state)

	useEffect(() => {
		socket.current = io('ws://localhost:8900')
	}, [])
	
	useEffect(() => {
		socket.current.emit('addUser', auth.user._id)
		// socket.current.on("getUsers", users => {
		// 	console.log('user connected')
		// });
	}, [auth])

	return (
		<React.Fragment>
			<div className="nav__bar">
				<div className="nav__header">HOWDY</div>
				<Link to='/' className="nav__link" onClick={() => dispatch(logout())} >Logout</Link>
			</div>
			<div className="component__container">
				<Sidebar />
				<Conversation/>
				<Instruction />
			</div>
			
		</React.Fragment>
	);
}

export default Home;

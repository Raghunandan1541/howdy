import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'

import Sidebar from './Sidebar'
import Conversation from '../Conversation/Conversation'

import './home.css'
import '../Navbar/navbar.css'
import {logout} from '../../redux/actions/authAction'

function Home() {

	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<div className="nav__bar">
				<div className="nav__header">HOWDY</div>
				<Link to='/' className="nav__link" onClick={() => dispatch(logout())} >Logout</Link>
			</div>
			<div className="component__container">
				<Sidebar />
				<Conversation/>
			</div>
			
		</React.Fragment>
	);
}

export default Home;

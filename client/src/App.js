import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'

import Home from './components/Home/Home';
import Login from './components/Login_Register/Login'
import Register from './components/Login_Register/Register';

import { refreshToken } from './redux/actions/authAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient';

const App = () => {
	
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshToken())

		const socket = io()
		dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
		return () => socket.close()
	},[dispatch])


	return (
		<Router>
			{auth.token && <SocketClient />}

			<Route exact path="/" component={auth.token ? Home : Login } />
			<Route exact path="/register" component={Register} />
		</Router>
	);
};

export default App;

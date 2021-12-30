import axios from "axios"
import { GLOBALTYPES } from "./globalTypes"

export const chatlist = (data) => async (dispatch) => {
	dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
	
	await axios.post('/api/conversations', data)
	
}

export const getchatusers = (id) => async (dispatch) => {
	const res = await axios.get(`/api/conversations/${id}`)

	const newData = res.data.map(id => id._id)
	
	dispatch({ 
		type: GLOBALTYPES.CONVERSATIONS, 
		payload: newData
	})
}
import { GLOBALTYPES } from "./globalTypes"

export const access = (data) => async (dispatch) => {
	dispatch({
		type: GLOBALTYPES.ACCESS,
		payload: data
	})
}

export const chatwith = (data) => async (dispatch) => {

	dispatch({
		type: GLOBALTYPES.CONVERSATIONS,
		payload: data
	})
}
import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = []

const chatlistReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.CONVERSATIONS:
            return action.payload;
        default:
            return state;
    }
}


export default chatlistReducer

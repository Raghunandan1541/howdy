import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = []

const chatwithReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.CONVERSATIONS:
            return action.payload;
        default:
            return state;
    }
}


export default chatwithReducer

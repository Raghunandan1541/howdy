import { GLOBALTYPES } from "../actions/globalTypes";

const accessReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPES.ACCESS:
            return action.payload;
        default:
            return state;
    }
}


export default accessReducer
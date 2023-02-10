import { SET_PARTICIPANTS_COUNT } from "../actions/types";


const initialState = {
    participantCount : 0
};

export const participant = (state = initialState, action) => {
    switch(action.type) {
        case SET_PARTICIPANTS_COUNT:
            state.participantCount += action.payload;
            return state;
        default:
            return state;
    }
}
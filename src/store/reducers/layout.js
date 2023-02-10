import {SET_FULLSCREEN_MODE, SET_USER_RESOLUTION, SET_LAYOUT, SET_HAND_RAISE, SET_PIN_PARTICIPANT, SET_PRESENTER, SET_DISCONNECTED, SET_PRESENTATION_TYPE, SET_MODERATOR, SET_START_WHITEBOARD, SET_STOP_WHITEBOARD, SET_START_SHARED_DOCUMENTS, SET_STOP_SHARED_DOCUMENTS, TOGGLE_CHAT, TOGGLE_PIP} from "../actions/types";
//import {EXIT_FULL_SCREEN_MODE, GRID, SPEAKER} from "../../constants";
import { isPortrait } from "../../utils";

const initialState  = {
    //type: isPortrait() ? GRID : SPEAKER,  //default layout,
    //mode: EXIT_FULL_SCREEN_MODE, //default mode,
    pinnedParticipant: {},
    presenterParticipantIds: [],
    raisedHandParticipantIds: {},
    disconnected: null,
    resolution: {},
    presentationType: null,
    moderator: {},
    toggleChat: false,
    togglePip: false
};

export const layoutInitialState  = { ... initialState };

export const layout = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CHAT:
            state.toggleChat = !state.toggleChat;
            return {...state};
        case TOGGLE_PIP:
            console.log("toggle pip", action.payload);
            state.togglePip = action.payload;
            return {...state};
        case SET_USER_RESOLUTION:
            if (action.payload.resolution) {
                state.resolution[action.payload.participantId] = action.payload.resolution;
            } else {
                delete state.resolution[action.payload.participantId]
            }
            return {...state};

        case SET_LAYOUT:
            state.type = action.payload;
            return {...state};
        case SET_FULLSCREEN_MODE:             
            state.mode = action.payload;
            return {...state};
        case SET_DISCONNECTED:
            state.disconnected = action.payload;
            return {...state};
        case SET_HAND_RAISE:
            if (action.payload.raiseHand) {
                state.raisedHandParticipantIds[action.payload.participantId] = action.payload.participantId;
            } else {
                delete state.raisedHandParticipantIds[action.payload.participantId]; 
            }
            return {...state};
        case SET_MODERATOR:
            if (action.payload.isModerator) {
                state.moderator[action.payload.participantId] = action.payload.participantId;
            }
            return {...state};
        case SET_PRESENTER:
            if (action.payload.presenter) {
                state.presenterParticipantIds.push(action.payload.participantId);
            } else {
                state.presenterParticipantIds = state.presenterParticipantIds.filter(item=>item!==action.payload.participantId); 
            }
            return {...state};
        case SET_PIN_PARTICIPANT:
            state.pinnedParticipant = action.payload.participantId ? {isPresenter: action.payload.type, participantId: action.payload.participantId} : {} ;
            console.log("state.pinnedParticipant", state.pinnedParticipant);
            return {...state};
        case SET_PRESENTATION_TYPE:
            state.presentationType = action.payload.presentationType;
            return {...state};
        default:
            return state;
    }
}

import {localTrack} from './localTrack';
import { media } from './media';
import {remoteTrack} from './remoteTrack';
import { conference } from './conference';
import { connection } from './connection';
import { profile } from './profile';
import { combineReducers } from 'redux';
import { color } from './color';
import { layout } from './layout';
import { chat } from './chat';
import { message } from './message';
import { audioIndicator } from './audioIndicator';
import { participant } from './participant';


export const appReducer = combineReducers({
    conference,
    connection,
    remoteTrack,
    localTrack,
    profile,
    media,
    color,
    layout,
    chat,
    message,
    audioIndicator,
    participant
});

export const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_ALL') {
        return appReducer({ localTrack: [], profile: state.profile, remoteTrack:{} }, action);
    }
    return appReducer(state, action);
}

// export const rootReducer = ({ localTrackReducer, remoteTrackReducer, mediaReducer, connectionReducer, conferenceReducer, profileReducer}, action) => {
//     return {
//         localTrack: localTrack(localTrackReducer, action),
//         remoteTrack: remoteTrack(remoteTrackReducer, action),
//         media: media(mediaReducer, action),
//         connection: connection(connectionReducer, action),
//         conference: conference(conferenceReducer, action),
//         profile: profile(profileReducer, action)
//     }
// } 
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = exports.appReducer = void 0;

var _localTrack = require("./localTrack");

var _media = require("./media");

var _remoteTrack = require("./remoteTrack");

var _conference = require("./conference");

var _connection = require("./connection");

var _profile = require("./profile");

var _redux = require("redux");

var _color = require("./color");

var _layout = require("./layout");

var _chat = require("./chat");

var _message = require("./message");

var _audioIndicator = require("./audioIndicator");

var _participant = require("./participant");

var appReducer = (0, _redux.combineReducers)({
  conference: _conference.conference,
  connection: _connection.connection,
  remoteTrack: _remoteTrack.remoteTrack,
  localTrack: _localTrack.localTrack,
  profile: _profile.profile,
  media: _media.media,
  color: _color.color,
  layout: _layout.layout,
  chat: _chat.chat,
  message: _message.message,
  audioIndicator: _audioIndicator.audioIndicator,
  participant: _participant.participant
});
exports.appReducer = appReducer;

var rootReducer = function rootReducer(state, action) {
  if (action.type === 'CLEAR_ALL') {
    return appReducer({
      localTrack: [],
      profile: state.profile,
      remoteTrack: {}
    }, action);
  }

  return appReducer(state, action);
}; // export const rootReducer = ({ localTrackReducer, remoteTrackReducer, mediaReducer, connectionReducer, conferenceReducer, profileReducer}, action) => {
//     return {
//         localTrack: localTrack(localTrackReducer, action),
//         remoteTrack: remoteTrack(remoteTrackReducer, action),
//         media: media(mediaReducer, action),
//         connection: connection(connectionReducer, action),
//         conference: conference(conferenceReducer, action),
//         profile: profile(profileReducer, action)
//     }
// } 


exports.rootReducer = rootReducer;
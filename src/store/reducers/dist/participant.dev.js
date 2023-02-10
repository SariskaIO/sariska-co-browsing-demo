"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.participant = void 0;

var _types = require("../actions/types");

var initialState = {
  participantCount: 0
};

var participant = function participant() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.SET_PARTICIPANTS_COUNT:
      state.participantCount += action.payload;
      return state;

    default:
      return state;
  }
};

exports.participant = participant;
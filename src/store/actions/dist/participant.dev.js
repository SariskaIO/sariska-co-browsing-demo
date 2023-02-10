"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setParticipantCount = void 0;

var _types = require("./types");

var setParticipantCount = function setParticipantCount(count) {
  return {
    type: _types.SET_PARTICIPANTS_COUNT,
    payload: count
  };
};

exports.setParticipantCount = setParticipantCount;
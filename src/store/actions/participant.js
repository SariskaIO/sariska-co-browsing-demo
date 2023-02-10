import { SET_PARTICIPANTS_COUNT } from "./types"

export const setParticipantCount = (count) => {
    return {
        type: SET_PARTICIPANTS_COUNT,
        payload: count
    }
}
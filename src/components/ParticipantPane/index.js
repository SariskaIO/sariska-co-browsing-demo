import { Box } from '@mui/material';
import React from 'react'
import VideoBox from '../VideoBox';

const ParticipantPane = ({
    conference, remoteTracks, localTracks, largeVideoId
}) => {
    const MAX_PARTICIPANTS_LIMIT = 2;

    // all tracks
    const tracks = { ...remoteTracks, [conference.myUserId()]: localTracks };
    // all participants 
    let participants = [...conference.getParticipantsWithoutHidden(), { _identity: { user: conference.getLocalUser() }, _id: conference.myUserId() }];

    if (largeVideoId) {
        participants  = participants.filter(p=>!(p._id === largeVideoId));
    }

    if (participants.length <= 0)  {
        return null;
    }
    
    return (
    <Box 
        sx={{
            display: "flex",
            flexWrap: "wrap",
            height: `500px`,
            minHeight: '220px',
            justifyContent: participants?.length === 5 ? 'space-around' : 'space-between' 
        }}
    >
            { participants.slice(0, MAX_PARTICIPANTS_LIMIT-1).map(participant =>               
                <VideoBox
                    localUserId={conference.myUserId()}
                    width={'220px'}
                    //height={ participants?.length > 1 ? videoElHeight : 250}
                    height={ 250}
                    containerHeight={'204px'}
                    isFilmstrip={false}
                    participantDetails={participant?._identity?.user}
                    participantTracks={tracks[participant._id]}
                />
            )}
        </Box>
     )
}

export default ParticipantPane
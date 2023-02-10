

import React from 'react';
import { useSelector } from "react-redux";
import VideoBox from "../VideoBox";
import { Box, Grid, styled } from '@mui/material';

const ParticipantGrid = () => {
    const Root = styled(Box)(()=>({
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }))
    const conference = useSelector(state => state.conference);
    const localTracks = useSelector(state => state.localTrack);
    const remoteTracks = useSelector(state => state.remoteTrack);
    const localUser = conference.getLocalUser();

    // all participants 
    const tracks = { ...remoteTracks, [localUser.id]: localTracks };
    // all tracks
    const participants = [...conference.getParticipantsWithoutHidden(), { _identity: { user: localUser }, _id: localUser.id }];
    // now render them as a grid
    let rows = 2;
    let columns = 1
    console.log('partu', participants, remoteTracks);
    return (
        <Root >
            <Grid style={{position: "relative" }} container item>
                {[...Array(rows)].map((x, i) =>
                    <>
                        {[...Array(columns)].map((y, j) => {
                            return (tracks[participants[i * columns + j]?._id] || participants[i * columns + j]?._id) &&
                                <Box style={{ 
                                    position: "absolute"
                                }}>
                                    <VideoBox key={i * columns + j}
                                        height={'500px'}
                                        width={'300px'}
                                        participantTracks={tracks[participants[i * columns + j]._id]}
                                    />
                                </Box>
                            }
                        )}
                    </>
                )}
            </Grid>
        </Root>
    );
}

export default ParticipantGrid;
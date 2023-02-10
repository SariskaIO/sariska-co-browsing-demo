import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import VideoBox from '../VideoBox'
import ParticipantPane from '../ParticipantPane';
import { getModerator } from '../../utils';
import SariskaMediaTransport from 'sariska-media-transport/dist/esm/SariskaMediaTransport';
import { useSelector } from 'react-redux';
import { VIDEO_WIDTHS } from '../../constants';

const SpeakerLayout = ({dominantSpeakerId}) => {
  const conference = useSelector(state => state.conference);
  const layout = useSelector(state=>state.layout);
  const localTracks = useSelector(state => state.localTrack);
  const remoteTracks = useSelector(state => state.remoteTrack);
  const resolution = useSelector(state => state.media?.resolution);
  const myUserId = conference.myUserId();
  let largeVideoId, participantTracks, participantDetails;
  const tracks = { ...remoteTracks, [conference.myUserId()]: localTracks };
  
  let moderator = getModerator(conference, tracks);
  
  if(moderator && moderator?.moderatorId){
    largeVideoId = moderator?.moderatorId || myUserId || dominantSpeakerId;
  }else{
    largeVideoId = myUserId || dominantSpeakerId
  }

  participantTracks = remoteTracks[largeVideoId];
  participantDetails =  conference.participants[largeVideoId]?._identity?.user; 

  if(moderator?.moderatorId && largeVideoId === moderator?.moderatorId){
    participantTracks = moderator?.moderatorTrack;
    participantDetails = conference.participants[`${moderator?.moderatorId}`];
  }

  if (largeVideoId === conference.myUserId()){
      participantTracks = localTracks;
      participantDetails = conference.getLocalUser();
  }

  console.log('largeVideoId', largeVideoId, conference.myUserId(), conference.getParticipantCount(), conference.getParticipantsWithoutHidden());
  
  const videoTrack = participantTracks?.find(track => track.getVideoType() === "camera");
  const constraints = {
      "lastN": 25,
      "colibriClass": "ReceiverVideoConstraints",
      "selectedSources":  [],
      "defaultConstraints": {"maxHeight": 180 },
      "onStageSources":  [videoTrack?.getSourceName()],
      constraints: {
          [videoTrack?.getSourceName()]:  { "maxHeight":  layout?.resolution[largeVideoId] || resolution  }
      }
  }
  conference.setReceiverConstraints(constraints);
  let participants = [...conference.getParticipantsWithoutHidden(), { _identity: { user: conference.getLocalUser() }, _id: conference.myUserId(), _role: conference.getRole() }];

  // Object.key(tracks)?.map(id => )

return (
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', position: 'relative'}}>
        <span>conf</span>
          <Box sx={{position: 'relative', marginTop: '18px', marginBottom: '5px'}}>
          <VideoBox
              isFilmstrip={true}
              width={VIDEO_WIDTHS.medium}
              height={278}
              isLargeVideo={true}
              isActiveSpeaker={ largeVideoId === dominantSpeakerId }
              participantDetails={participantDetails}
              participantTracks={participantTracks}
              localUserId={conference.myUserId()}
              containerHeight={'204px'}
          />
            </Box>
          {/* <ParticipantPane
              panelHeight = {220}
              panelWidth={420}
              gridItemWidth = {134}    
              gridItemHeight= {100}   
              dominantSpeakerId={dominantSpeakerId} 
              largeVideoId={largeVideoId} 
              localTracks={localTracks} 
              remoteTracks={remoteTracks}
          /> */}
  </Box>
)
}

export default SpeakerLayout
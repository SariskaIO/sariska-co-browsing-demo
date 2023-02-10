import React from "react";
import Video from "../Video";
import { Box, styled } from "@mui/material";

const Root = styled(Box)(({theme})=>({
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  background: '#272931',
  display: "flex",
  flexDirection: "column",
  transform: "translateZ(0)",
  zIndex: 1
}));
const VideoWrapper = styled(Box)(()=>({
  margin: "auto",
  zIndex: 2
}));

const VideoBox = ({
  participantTracks
}) => {
  let videoTrack = participantTracks?.find((track) => track.getType() === "video");

    console.log('videot', participantTracks, videoTrack)
  return (
    <Root
    >
        <VideoWrapper
        >
          <Video track={videoTrack} />
        </VideoWrapper>
    </Root>
  );
};

export default VideoBox;
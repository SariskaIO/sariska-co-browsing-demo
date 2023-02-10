import React, { useEffect, useRef } from "react";

const Video = (props) => {
  const { track } = props;
  const videoElementRef = useRef(null);
console.log('tracksm', track);
  useEffect(() => {
    const attachTrack = () => track ? track?.attach(videoElementRef.current) : null;
    attachTrack();
}, [track]);

  if (!track) {
    console.log('no track', track)
    //return null;
  }

  //let participants = conference ? [...conference?.getParticipantsWithoutHidden(), { _identity: { user: conference?.getLocalUser() }, _id: conference?.myUserId() }] : [];

  return (
      <video
        playsInline="1"
        autoPlay="1"
        className="video-element"
        ref={videoElementRef}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          borderRadius: "8px",
          transform: 'rotateY(180deg)'
          // left: "-1px",top: "-1px", width, height, objectFit: 'contain', borderRadius: '8px', transform: 'translate(-75px)'
        }}
      />
  );
};

export default Video;

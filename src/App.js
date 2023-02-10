import React, { useEffect, useState } from 'react';
import {Switch,Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import SariskaMediaTransport from "sariska-media-transport";
import { getToken } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { setDevices } from './store/actions/media';
import { addLocalTrack } from './store/actions/track';
import { addConnection } from './store/actions/connection';
import { setDisconnected } from './store/actions/layout';
import { addConference } from './store/actions/conference';
import { setMeeting, setProfile } from './store/actions/profile';
import { setParticipantCount } from './store/actions/participant';
import Cobrowsing from './components/Cobrowsing';


function App() {
  const profile = useSelector(state => state.profile);
  const localTrackRedux = useSelector(state => state.localTrack);
  const resolution = useSelector(state => state.media?.resolution);
  const participant = useSelector(state => state.participant);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [localTracks, setLocalTracks] = useState([]);

SariskaMediaTransport.initialize();
SariskaMediaTransport.setLogLevel(SariskaMediaTransport.logLevels.ERROR);
  useEffect(() => {
    SariskaMediaTransport.mediaDevices.enumerateDevices((allDevices) => {
      dispatch(setDevices(allDevices));
    });
  }, []);

  useEffect(()=>{
    if (localTrackRedux.length > 0)  {
        return;
    }
    const createNewLocalTracks = async () => {
        let tracks = [];
        const options = {
            devices: ["audio", "video"],
            resolution
        };

        try  {
            const [audioTrack] = await SariskaMediaTransport.createLocalTracks({devices: ["audio"], resolution});
            tracks.push(audioTrack);
        } catch(e) {
            console.log("failed to fetch audio device");
        }

        try  {
            const [videoTrack]  = await SariskaMediaTransport.createLocalTracks({devices: ["video"], resolution});
            tracks.push(videoTrack);
        } catch(e) {
            console.log("failed to fetch video device");
        }
        setLocalTracks(tracks);
        tracks.forEach(track=>dispatch(addLocalTrack(track)));
    };
    createNewLocalTracks();
},[])

  const handleNormalMeeting = async () => {
    setLoading(true);

    const token = await getToken({profile, name: profile.name});
    const connection = new SariskaMediaTransport.JitsiConnection(
      token,
      profile.meetingTitle
    );

    connection.addEventListener(
      SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED,
      () => { 
        console.log('connection successful!!!')
        dispatch(addConnection(connection));
        createConference(connection, profile.meetingTitle);
      }
    );

    connection.addEventListener(
      SariskaMediaTransport.events.connection.CONNECTION_FAILED,
      async (error) => {
        console.log(" CONNECTION_DROPPED_ERROR", error);

        if (
          error === SariskaMediaTransport.errors.connection.PASSWORD_REQUIRED
        ) {
          const token = await getToken({
            profile, name: profile.name
          });
          connection.setToken(token); // token expired, set a new token
        }
        if (
          error ===
          SariskaMediaTransport.errors.connection.CONNECTION_DROPPED_ERROR
        ) {
          dispatch(setDisconnected("lost"));
        }
      }
    );

    connection.addEventListener(
      SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED,
      (error) => {
        console.log("connection disconnect!!!", error);
      }
    );

    connection.connect();
  };

  const createConference = async (connection, sessionId) => {
    const conference = connection.initJitsiConference();
    if(localTracks?.length) localTracks.forEach(async (track) => await conference.addTrack(track));
    conference.addEventListener(
      SariskaMediaTransport.events.conference.CONFERENCE_JOINED,
      () => {
        setLoading(false);
        dispatch(addConference(conference));
        dispatch(setProfile(conference.getLocalUser()));
        dispatch(setMeeting({ meetingTitle: profile.meetingTitle }));
      }
    );

    // conference.addEventListener(
    //   SariskaMediaTransport.events.conference.USER_ROLE_CHANGED,
    //   (id) => {
    //     if (conference.isModerator()) {
    //       conference.enableLobby();
    //       navigate(`/colly/${sessionId}`);
    //     } else {
    //       navigate(`/colly/${sessionId}`);
    //     }
    //   }
    // );

    conference.addEventListener(
      SariskaMediaTransport.events.conference.CONFERENCE_ERROR,
      () => {
        setLoading(false);
      }
    );

    conference.addEventListener(
      SariskaMediaTransport.events.conference.USER_JOINED,
      (id) => {
        console.log('user_joined', id, participant);
        dispatch(setParticipantCount(1));
      }
    );

    conference.addEventListener(
      SariskaMediaTransport.events.conference.CONFERENCE_FAILED,
      async (error) => {
        if (
          error === SariskaMediaTransport.errors.conference.MEMBERS_ONLY_ERROR
        ) {
          conference.joinLobby(profile?.name || conference?.getLocalUser()?.name);
        }
        if (
          error ===
          SariskaMediaTransport.errors.conference.CONFERENCE_ACCESS_DENIED
        ) {
          setLoading(false);
        }
      }
    );

    conference.join();
  };


  useEffect(() => {
    if (profile.meetingTitle) {
      handleNormalMeeting();
    }
  }, [profile.meetingTitle, localTracks]);

  return (
    <React.Fragment>
      <Navbar />
          <Cobrowsing />
                {/* <div className={'co-browsing'}>
                    <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                      <Box>
                      <Box>
                      <video
                        id='remote-video'
                        playsInline="1"
                        autoPlay="1"
                        style={{
                          height: "200px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          transform: 'rotateY(180deg)'
                          // left: "-1px",top: "-1px", width, height, objectFit: 'contain', borderRadius: '8px', transform: 'translate(-75px)'
                        }}
                        />
                        <audio id='remote-audio' playsInline="1" autoPlay='1'/>
                      </Box>
                      <Box>
                        <video
                        id='local-video'
                        playsInline="1"
                        autoPlay="1"
                        style={{
                          height: "200px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          transform: 'rotateY(180deg)'
                          // left: "-1px",top: "-1px", width, height, objectFit: 'contain', borderRadius: '8px', transform: 'translate(-75px)'
                        }}
                        />
                        <audio id='local-audio' playsInline="1" autoPlay='1'/>
                        </Box>
                        </Box>

                      <Tooltip title={'hi'} arrow>
                           <button 
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              fontSize: '36px',
                            }}
                            >
                            C
                           </button>
                      </Tooltip>
                    </div>
                    
                </div> */}
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </React.Fragment>
  );
}

export default App;

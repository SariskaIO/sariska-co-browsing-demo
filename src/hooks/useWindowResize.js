import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

export function useWindowResize(participantCount) {
    const layout = useSelector(state => state.layout);
    const remoteTracks = useSelector(state => state.remoteTrack);
    const [windowSize, setWindowSize] = useState({viewportWidth: undefined, viewportHeight: undefined});

    function getDimensions(mode, type) {
        let documentWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        let documentHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        let viewportHeight, viewportWidth;

        if (participantCount === 1)  {
            return {viewportWidth: (documentHeight - 92)*16/9 , viewportHeight: documentHeight - 92};
        }

        if ( type === 'GRID' ) {
            return {viewportWidth: documentWidth , viewportHeight: documentHeight - 92};
        }

        viewportHeight = documentHeight - 92;        
        viewportWidth = documentWidth - 218 
        return { viewportWidth, viewportHeight };
    }

    useEffect(() => {
        setWindowSize(getDimensions(layout.mode, layout.type));
        window.removeEventListener("resize", handleResize)
        return ()=>{
            window.addEventListener("resize", handleResize)
        }
    }, [layout.mode, layout.type]);


    useEffect(() => {
        setWindowSize(getDimensions(layout.mode, layout.type));
    }, [remoteTracks, participantCount]);

    function handleResize() {
        setWindowSize(getDimensions(layout.mode, layout.type));
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);
    }, [layout.mode, layout.type]);

    return windowSize;
}
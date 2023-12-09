import { useRemoteVideo, useRemoteAudio } from "@huddle01/react/hooks";
import React, { useEffect, useRef } from "react";


const RemotePeer = ({ peerId }) => {
  const { stream:videoStream, state:videoState } = useRemoteVideo({ peerId });
  const { stream:audioStream, state:audioState } = useRemoteAudio({ peerId });

  const vidRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (vidRef && vidRef.current && videoState === "playable") {
      vidRef.current.srcObject = videoStream;
      vidRef.current?.play();
    }
    if (audioStream && audioRef.current && audioState === "playable") {
        audioRef.current.srcObject = audioStream;
        audioRef.current?.play();
    }
  }, [videoStream, videoState, audioStream, audioState]);

  return (
    <div className="flex h-full">
      <video
        ref={vidRef}
        autoPlay
        muted
        className="border-2 rounded-xl border-white-400 aspect-video w-full h-full"
      />
      <audio
        ref={audioRef}
        autoPlay
        />
    </div>
  );
};

export default React.memo(RemotePeer);
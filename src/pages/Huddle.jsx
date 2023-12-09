"use client";
import { useLocalAudio, useLocalVideo, usePeerIds, useRoom } from '@huddle01/react/hooks';
import React, { useEffect, useRef } from 'react'
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import RemotePeer from '../Components/RemotePeer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
const getAccessToken = () => {
    const accessToken = new AccessToken({
        apiKey:"Snx30DlpGR9GIrR4Cmp3IRGDHETCBLH9",
        roomId: "pov-dmvx-cdm",
        role:  Role.GUEST
      });
      return accessToken
}

const HuddleCom = () => {
    const { enableVideo, disableVideo, isVideoOn, stream: videoStream } = useLocalVideo();
    const { enableAudio,disableAudio, isAudioOn, stream: audioStream} = useLocalAudio();
    const { joinRoom, state, leaveRoom, closeRoom } = useRoom({
        onJoin: (room) => {
            if (isAudioOn) {
                SpeechRecognition.startListening({language: "en_IN"});
            }
          },
          onPeerJoin: (peer) => {
            console.log("onPeerJoin", peer);
          },
          onLeave: (data) => {
            SpeechRecognition.stopListening();

          }
    });
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const [completeTransscript, setCompleteTransscript] = useState([]);
    useEffect(() => {
        if (videoStream && videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
        if (audioStream && audioRef.current) {
            audioRef.current.srcObject = audioStream;
        }
        return () => {
            videoRef.current = null;
            audioRef.current = null;
        }
      }, []);
    const { peerIds } = usePeerIds();

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        sound
      } = useSpeechRecognition();


      const res = SpeechRecognition.getRecognition();
        res.onspeechstart = ()=> {
            let startDateTime = Date.now();
            console.log('start time', startDateTime)

        }
        res.onspeechend = () => {
            SpeechRecognition.startListening({language: "en_IN"});
            let endDateTime = Date.now();
            setCompleteTransscript([...completeTransscript, transcript]);
            console.log("end Date Time", endDateTime, 'trans', transcript);
        }


    const enableAudioFunc = async () => {
        await enableAudio();
        SpeechRecognition.startListening({language: "en_IN"});
        //startRecording();

    }
    const disableAudioFunc = async() => {
        await disableAudio();
        SpeechRecognition.stopListening();
        //stopRecording();
    }
    useEffect(()=> {
        if (!listening && state==="connected" && isAudioOn) {
            SpeechRecognition.startListening({language: "en_IN"});
          }
    }, [listening]);


  return (    
    <div className='flex align-content-center justify-center'>
        {state==="idle" &&<div className="w-[600px]">
          <div className='w-full mx-auto border-2 rounded-xl border-blue-400 h-[50vh] bg-black'>
        {isVideoOn ? (
            <>
          <video
            ref={videoRef}
            className="w-full h-full"
            autoPlay
            muted
          />
          <audio ref={audioRef} 
            autoPlay
          />
          </>
        ) : (<div className='h-full w-full'></div>)}
        </div>
        <div className='flex align-content-center justify-center my-2'>
            {!isVideoOn && <button className='p-3 bg-blue-600 text-slate-50' onClick={async() => {
                await enableVideo();
            }}>Enable Video</button>}
            {isVideoOn && <button className='p-3 bg-red-600 text-slate-50' onClick={async() => {
                await disableVideo();
            }}>Disable Video</button>}

            <div className='ml-5'>
                {!isAudioOn && <button className='p-3 bg-blue-600 text-slate-50' onClick={async() => {
                    await enableAudio();
                }}>Enable Audio</button>}
                {isAudioOn && <button className='p-3 bg-red-600 text-slate-50' onClick={async() => {
                    await disableAudio();
                }}>Disable Audio</button>}
            </div>
        </div>
        <div className='mt-2'>
        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required/>
        </div>
        <div className='flex justify-center mt-2'>
            <button className='bg-blue-600 text-slate-50 p-3' onClick={async () => {
                let callToken = getAccessToken();
                let token = await callToken.toJwt();
              await joinRoom({
                roomId: "pov-dmvx-cdm",
                token: token,
              });
              SpeechRecognition.startListening({language: "en_IN"});

            }}>Join Meeting </button>
        </div>
      </div>}
      {state==="connected" && <div className='w-[1200px] h-full'>
        <div className='bg-black'>
            {peerIds.length > 0 ? peerIds.map((peerId) =>
            peerId ? <RemotePeer key={peerId} peerId={peerId} /> : null
            ) : <div>
                <div className="flex h-full">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="border-2 rounded-xl border-white-400 aspect-video w-full h-full"
                    />
                    <audio
                        ref={audioRef}
                        autoPlay
                        />
                    </div>
            </div>}
        </div>
        <div className='flex align-content-center justify-center my-2'>
            {!isVideoOn && <button className='p-3 bg-blue-600 text-slate-50' onClick={async() => {
                await enableVideo();
            }}>Enable Video</button>}
            {isVideoOn && <button className='p-3 bg-red-600 text-slate-50' onClick={async() => {
                await disableVideo();
            }}>Disable Video</button>}

            <div className='ml-5'>
                {!isAudioOn && <button className='p-3 bg-blue-600 text-slate-50' onClick={async() => {
                    await enableAudioFunc();
                }}>Enable Audio</button>}
                {isAudioOn && <button className='p-3 bg-red-600 text-slate-50' onClick={async() => {
                    await disableAudioFunc();
                }}>Disable Audio</button>}
                <button className='p-3 bg-red-600 ml-2' onClick={async() => {
                    await leaveRoom()
                }}>Leave Meeting</button>
                <button className='p-3 bg-red-600 ml-2' onClick={async() => {
                    await closeRoom()
                }}>End meeting for everyone</button>
            </div>
            {completeTransscript}
        </div>
        </div>}
    </div>
  )
}

export default HuddleCom
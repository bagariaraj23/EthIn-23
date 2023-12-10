"use client";
import { useLocalAudio, useLocalVideo, usePeerIds, useRoom, useDataMessage } from '@huddle01/react/hooks';
import React, { useEffect, useRef } from 'react'
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import RemotePeer from '../Components/RemotePeer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import OpenAI from 'openai';
import { useParams } from 'react-router-dom';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import './huddle.css'
const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_PRIVATE_API_KEY, dangerouslyAllowBrowser: true});
const getAccessToken = (meetingLink) => {
    const accessToken = new AccessToken({
        apiKey: process.env.REACT_APP_HUDDLE_PRIVATE_API_KEY,
        roomId: meetingLink,
        role:  Role.GUEST
      });
      return accessToken
}
let reportGenerated;
const HuddleCom = () => {
    const { meetingLink } = useParams();

    const { enableVideo, disableVideo, isVideoOn, stream: videoStream } = useLocalVideo();
    const { enableAudio,disableAudio, isAudioOn, stream: audioStream} = useLocalAudio();

    const {sendData} = useDataMessage({
        onMessage(payload, from, label) {
            console.log("patient Transcript",payload, from)
            callDataToGPT(completeTransscript, payload);
        },
      });
      
    const { joinRoom, state, leaveRoom, closeRoom } = useRoom({
        onJoin: (room) => {
            if (isAudioOn) {
                SpeechRecognition.startListening({language: "en_IN"});
            }
          },
          onPeerJoin: (peer) => {
            console.log("onPeerJoin", peer);
          },
          onPeerLeft: (data) => {
            console.log("Onleave",data)
            SpeechRecognition.stopListening();
          }
    });

    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const [completeTransscript, setCompleteTransscript] = useState('');
    useEffect(() => {
        if (videoStream && videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
        if (audioStream && audioRef.current) {
            audioRef.current.srcObject = audioStream;
        }
      }, [videoStream, audioStream, videoRef, audioRef]);
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
            setCompleteTransscript((prevTranscript) => [
                ...(Array.isArray(prevTranscript) ? prevTranscript : []),
                { startTime: startDateTime, message: '' },
              ]);

        }
        res.onspeechend = () => {
            SpeechRecognition.startListening({language: "en_IN"});
            // setCompleteTransscript({ message: transcript})
            let endDateTime = Date.now();
            setCompleteTransscript((prevTranscript) =>
    Array.isArray(prevTranscript)
      ? prevTranscript.map((entry, index) =>
          index === prevTranscript.length - 1
            ? { ...entry, message: transcript }
            : entry
        )
      : []
  );
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


    const callDataToGPT = async(hostTranscript, patientTranscript) => {
        console.log(hostTranscript, patientTranscript)
        const newTherapistArray = hostTranscript.map(obj => ({ ...obj, ["User"]: "Therapist" }));
        const newPatientArray = JSON.parse(patientTranscript).map(obj => ({ ...obj, ["User"]: "Patient" }));
        const mergedAndSortedArray = [...newTherapistArray, ...newPatientArray].sort((a, b) => a.startTime - b.startTime);
        console.log(mergedAndSortedArray);

        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a helpful assistant. You will be Provided with an array of statement objects which will represent a conversation between a therapist and mental health patient . Please Provide a summarized report based on the conversation. "},
                {"role": "user", "content": JSON.stringify(mergedAndSortedArray)}],
            model: "gpt-3.5-turbo",
          });
          console.log(completion.choices[0].message.content);
          reportGenerated = completion.choices[0];
          console.log("Report: ",reportGenerated);
    }

    const sendDataFunc = () => {
        SpeechRecognition.stopListening();
        if (peerIds.length > 0) {
            sendData({to:peerIds, payload:JSON.stringify(completeTransscript)})
            console.log("My Transcript:",completeTransscript);
        }
    }

  return (    
    <div className='flex align-content-center justify-center'>
        {state==="idle" &&<div className="w-full p-6 px-20">
          <div className='w-full mx-auto rounded-xl  h-[80vh] position-absolute bg-black video-container'>
        {isVideoOn ? (
            <>
          <video
            ref={videoRef}
            className="w-full h-full aspect-square"
            autoPlay
            muted
          />
          <audio ref={audioRef} 
            autoPlay
          />
          </>
        ) : (<div className='h-full w-full'></div>)}
        </div>
        <div className='flex align-content-center flex-col justify-center'>
            <div className='flex align-content-center justify-center my-4 button-container'>
            {!isVideoOn && <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-fit' onClick={async() => {
                await enableVideo();
            }}><VideocamIcon/></button>}
            {isVideoOn && <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-fit ' onClick={async() => {
                await disableVideo();
            }}><VideocamOffIcon/></button>}

            <div className='ml-5'>
                {!isAudioOn && <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-fit lg:ml-auto' onClick={async() => {
                    await enableAudio();
                }}><MicIcon/></button>}
                {isAudioOn && <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-fit lg:ml-auto' onClick={async() => {
                    await disableAudio();
                }}><MicOffIcon/></button>}
            </div>
        </div>
        <div className='form__group field mt-2'>
        <input type="text" id="first_name" className="form__field bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark: dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500" placeholder="John" label="Enter Name Here" required/>
        </div>
        <div className='flex justify-center mt-2'>
            <button className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-gray-900 w-fit ' onClick={async () => {
                let callToken = getAccessToken(meetingLink);
                let token = await callToken.toJwt();
              await joinRoom({
                roomId: meetingLink,
                token: token,
              });
              SpeechRecognition.startListening({language: "en_IN"});

            }}>Join Meeting </button>
        </div></div>
        
      </div>}
      {state==="connected" && <div className='w-full p-6 px-20 video-container'>
        <div className='bg-black'>
            {peerIds.length > 0 ? peerIds.map((peerId) =>
            peerId ? <RemotePeer key={peerId} peerId={peerId} /> : null
            ) : <div>
                <div className="flex h-full">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="border-2 rounded-xl border-white-400 aspect-square w-full h-full"
                    />
                    <audio
                        ref={audioRef}
                        autoPlay
                        />
                    </div>
            </div>}
        </div>
        <div className='flex align-content-center justify-center my-4 button-container'>
            {!isVideoOn && <button className='p-3 bg-blue-600 text-slate-50' onClick={async() => {
                await enableVideo();
            }}><VideocamIcon/></button>}
            {isVideoOn && <button className='p-3 bg-red-600 text-slate-50' onClick={async() => {
                await disableVideo();
            }}><VideocamOffIcon/></button>}

            <div className='ml-5'>
                {!isAudioOn && <button className='p-3 bg-blue-600 text-slate-50' onClick={async() => {
                    await enableAudioFunc();
                }}><MicIcon/></button>}
                {isAudioOn && <button className='p-3 bg-red-600 text-slate-50' onClick={async() => {
                    await disableAudioFunc();
                }}><MicOffIcon/></button>}
                <button className='p-3 bg-red-600 ml-2' onClick={async() => {
                    sendDataFunc()
                    await leaveRoom()
                }}>Leave Meeting</button>
                <button className='p-3 bg-red-600 ml-2' onClick={async() => {
                    await closeRoom()
                }}>End meeting for everyone</button>
                
            </div>
            
           
        </div>
        <div className='flex m-10 p-8'>
                <p>Report:<span>{reportGenerated.message.content}</span></p>
                </div>
        </div>}
    </div>
  )
}

export default HuddleCom
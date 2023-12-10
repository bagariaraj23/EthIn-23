"use client";
import { useLocalAudio, useLocalVideo, usePeerIds, useRoom, useDataMessage } from '@huddle01/react/hooks';
import React, { useEffect, useRef } from 'react'
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import RemotePeer from '../Components/RemotePeer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.REACT_OPENAI_PRIVATE_API_KEY, dangerouslyAllowBrowser: true});
const getAccessToken = () => {
    const accessToken = new AccessToken({
        apiKey: process.env.REACT_HUDDLE_PRIVATE_API_KEY,
        roomId: "pov-dmvx-cdm",
        role:  Role.GUEST
      });
      return accessToken
}
let reportGenerated;
const HuddleCom = () => {
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
        // const inputData = {
        //     input: mergedAndSortedArray,
        //     steps: [
        //         {
        //             skill: "summarize"
        //         }
        //     ]
        //   };
        //   fetch("https://api.oneai.com/api/v0/pipeline", {method:"POST", headers: {
        //     "Content-Type": "application/json",
        //     "api-key": "437f77b0-2e4b-4597-8e20-a87ffaf10762"
        //   },body: JSON.stringify(inputData)})
        //   .then(response => response.text())
        //   .then(result => console.log("Ai Result:",result))
        //   .catch(error => console.log('error', error));
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
                    sendDataFunc()
                    callDataToGPT()
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
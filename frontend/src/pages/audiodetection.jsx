import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionComponent = () => {
  const [transcription, setTranscription] = useState(['']);
  const [recording, setRecording] = useState(false);


 

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
    //SpeechRecognition.startListening({language: "en_IN"});
    let endDateTime = Date.now();
    console.log("end Date Time", endDateTime, 'trans', transcript);
  }
  console.log(transcript, listening)
  
  useEffect(() => {

    //startRecording();
    if (!listening) {
        SpeechRecognition.startListening({language: "en_IN"});
    }
  }, [listening]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Speech Recognition</h1>
      <p>{transcript}</p>
      {recording && <p>Recording...</p>}
    </div>
  );
};

export default SpeechRecognitionComponent;

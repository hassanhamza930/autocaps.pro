import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Player } from '@remotion/player'
import { TextAnim } from './remotion/textAnimComp'

function App() {
  const [count, setCount] = useState(0)
  const duration = 8

  const [permission, setpermission] = useState(false);
  const [stream, setStream] = useState(null);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [speech, setspeech] = useState("Hello World, Let's see how it goes");
  const mimeType = "audio/webm";



  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };


  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };


  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setpermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  useEffect(()=>{
    getMicrophonePermission();
    setTimeout(()=>{
      setspeech("I mean i'm not the one to complain or anything but it's just been really hard these past couple of days");
    },2000);
  },[])


  return (
    <div style={{ backgroundImage: `url("https://cdn.dribbble.com/users/600626/screenshots/2944155/loading_img.gif")` }} className='h-screen w-full bg-repeat bg-center'>
      <div className='h-full w-full bg-black/90 p-10 flex backdrop-blur-xl flex-row justify-start items-center gap-5'>

        <Player
          autoPlay
          loop
          className='h-full rounded-xl opacity-90 flex-none'
          component={TextAnim}
          durationInFrames={30 * duration}
          posterFillMode='player-size'
          compositionHeight={1920}
          compositionWidth={1080}
          style={{ height: '100%' }}
          inputProps={{title:speech}}
          fps={30}
        />

        <div className='h-full w-full bg-white/90 rounded-xl backdrop-blur-xl flex flex-col gap-5 justify-center items-center'>
          <div className="audio-controls">
            {!permission ? (
              <button className='bg-yellow-400 text-black/90 shadow-md rounded-md px-6 py-2' onClick={getMicrophonePermission} type="button">
                Get Microphone
              </button>
            ) : null}
            {permission && recordingStatus === "inactive" ? (
              <button className='bg-blue-600 text-white rounded-md px-6 py-2' onClick={startRecording} type="button">
                {
                  audio?
                  "Record Again":
                  "Start Recording"
                }
              </button>
            ) : null}
            {recordingStatus === "recording" ? (
              <button className='bg-red-500 text-white rounded-md px-6 py-2' onClick={stopRecording} type="button">
                Stop Recording
              </button>
            ) : null}
          </div>

          {audio ? (
            <div className="audio-container flex flex-col justify-center items-center gap-5">
              <audio src={audio} controls></audio>
              <a className='px-6 text-xs py-2 rounded-full bg-black text-white/80 shadow-xl' download href={audio}>
                Download Recording
              </a>
            </div>
          ) : null}

        </div>

      </div>


    </div>
  )
}

export default App

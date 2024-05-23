import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Webcam from "react-webcam";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Navbar from "../components/Navbar";
import { TextField, Button, CircularProgress } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./Main.css";
import SenderChat from "./SenderChat";
import ReceiverChat from "./ReceiverChat";
import Visualizer from "../components/Visualizer";
import NewHomeBackgrounnd from "../components/newHome";
import Timer from "./Timer";
import { getTokenOrRefresh } from './../components/token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import VisualizerCopy from "../components/Visualizeropy";
import { useDispatch, useSelector } from "react-redux";
import { getInterviewData, interviewQuestion } from "../reducers/interviewReducer";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');
const EditInterview = () => {

  const [edit, setEdit] = useState(false);


  const [recordings, setRecordings] = useState([]);
  const audioChunk = useRef([]);
  const [file, setFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [end, setEnd] = useState(false);

  const [start, setStart] = useState(false);
  const {interview_id}=useParams();
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [speechRecognizer, setSpeechRecognizer] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [showSpeakButton, setShowSpeakButton] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [editable, setEditable] = useState(false);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const response = useSelector((state) => state.interview.questionsData);
    const [messages, setMessages] = useState(response.messages || []);
    const [scores, setScores] = useState(response.scores);
    const [data, setData] = useState(response);
    const dispatch = useDispatch();
    let currentCount =0;
  const toggleStart = () => {
    if (start) {
      setEnd(!end);
    } else {
      setStart(!start);
    }
  };

  useEffect(() => {
    return () => {
        if (speechRecognizer) {
            speechRecognizer.close();
        }
    }
}, [speechRecognizer]);
useEffect(()=>{
    console.log(interview_id)
    dispatch(getInterviewData(interview_id));
},[])

async function sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'en-US';
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    setSpeechRecognizer(recognizer);
    setDisplayText('Speak into your microphone...');
    setIsRecording(true);
    recognizer.startContinuousRecognitionAsync();
    recognizer.recognizing = (s, e) => {
        console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizer.recognized = (s, e) => {
        if (e.result.reason === ResultReason.RecognizedSpeech) {
            console.log(`RECOGNIZED: Text=${e.result.text}`);
            setRecognizedText(prevText => prevText + ' ' + e.result.text);
        } else if (e.result.reason === ResultReason.NoMatch) {
            console.log("NOMATCH: Speech could not be recognized.");
        }
    };

    recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
        if (e.reason === speechsdk.CancellationReason.Error) {
            console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
            console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
            console.log("CANCELED: Did you set the speech resource key and region values?");
        }
        recognizer.stopContinuousRecognitionAsync();
    };

    recognizer.sessionStopped = (s, e) => {
        console.log("\n    Session stopped event.");
        recognizer.stopContinuousRecognitionAsync();
    };
}

const handleStop = () => {
    if (speechRecognizer) {
        speechRecognizer.stopContinuousRecognitionAsync(
            () => {
                console.log("Recognition stopped.");
                setDisplayText("Recognition stopped.");
            },
            (err) => {
                console.error("Error stopping recognition: ", err);
            }
        );
    }
    setIsRecording(false);
    setShowSpeakButton(false);
};

const webcamRef = useRef(null);
const startData=useSelector((state)=>state.interview.interviewData);

const handleSubmit = async (e) => {
    console.log()
    e.preventDefault();
    setLoading(true);
    const req = {
        prevMessages: response.messages,
        answer: recognizedText,
        scores: scores,
        name: startData.candidate_name,
        skill: startData.skill_name,
       
    };
    console.log(req);
    await dispatch(interviewQuestion(req));
    setLoading(false);
    setRecognizedText("");
    setShowSpeakButton(true);
    setEditable(false);
    currentCount+=1;
};

const handleEdit = () => {
    setEditable(true);
};
const startInterview = async () => {
    setLoading(true);
    await dispatch(interviewQuestion({name:startData.candidate_name,skill:startData.skill_name}));
    setLoading(false); 
    setShowSpeakButton(true)
    setInterviewStarted(true);
};
const navigate=useNavigate()
const pop=()=>{
    swal({
        text:"Thank you! Your Interview is now Completed,You can view your results!",
        icon:"success"
    }
    ).then(()=>{
        navigate("/report")
    })
}
  return (
    <div>
      
     {!interviewStarted && !loading && (<div className="w-full h-10">  
                        <Button onClick={startInterview} variant="contained" color="primary" className="mt-10">
                            Start Interview
                        </Button></div>
                    )}
                    {
                        response.final ? <div>{pop()}</div> : <div></div>
                    }
                     {loading ? ( 
                        <div className="flex justify-center items-center h-full">
                            <CircularProgress />
                        </div>
                    ) : (
      <div className="relative flex flex-row h-screen    justify-around ">
        {/* <div className="fixed top-0 left-0 z-[-10]">
        <NewHomeBackgrounnd />
      </div> */}
        <div
          className="relative  bg-white-500 justify-between basis-1/4 h-full my-auto  flex flex-col my-2  "
          style={{ borderRight: "inset" }}
        >
          <div className="pt-[45px] bg-black relative rounded basis-2/4 min-h-[250px] w-full min-w-40 mx-auto ">
           
              <Webcam
                audio={false}
                ref={webcamRef}
                className=" z-0 w-full h-full object-cover   my-auto"
              />
           
           

              {/* VIDEO OFF*/}

              {/* VIDEO ON */}
            
          </div>
          {/* <div
          id="ttos"
          className="rounded-full mt-0.5 min-h-[250px] basis-2/4 w-full min-w-40 mx-auto bg-black"
        >
        <img
          src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png"
          className=" relative w-full object-contain h-full"
        />

                  
          <Visualizer />
        </div> */}
          <div className="relative rounded mt-0.5 min-h-[250px] basis-2/4 bg-[#0b0710] w-full min-w-40 mx-auto ">
            {/* <div className="absolute top-[30%] left-[40%] bg-[#45E856] blur-3xl h-20 w-20"></div> */}
            <VisualizerCopy interviewStarted={interviewStarted} />
          </div>
        </div>
        <div className="bg-black min-h-[500px]  relative justify-around h-full basis-3/4 flex flex-col  my-auto mx-auto ">
          <div className="relative customScrollNav flex flex-col rounded h-full mt-[42px]  lg:mx-auto   z-10 ">
            <SenderChat
              Text={
               response.question
              }
            />

            {/* <div className="w-[90%] h-[2px] bg-[#000000] mx-[4px]"></div> */}

            <ReceiverChat
              Text={
                recognizedText
              }
              editable={edit}
            />

            <div
              className="absolute w-[100%] abc   bg-black text-start bottom-3 flex flex-row"
              style={{ flexGrow: "1" }}
            >
              {/* <div className="basis-1/4 bg-[#ffab12]"></div> */}
              <div className=" ml-[9px]  flex flex-col justify-center">
                <div className="basis-2/4 flex justify-center">
                { !isRecording ? 
                
                  <button onClick={sttFromMic}>
                  <img
                    className="relative  w-[40px] h-[40px]"
                    src="https://img.icons8.com/ios/50/microphone.png"
                    alt="microphone"
                    style={{
                      padding: "10px",
                      borderRadius: "21px",
                      background: "#ba8ccd",
                    }}
                  /></button> : <button className="text-white bg-red-600" onClick={handleStop}>Stop</button>
                
                }
                </div>
              </div>
             
              <div
                style={{
                  boxShadow: "#9c6aab 4px 3px 0px 1px",
                  flexGrow: "1",
                  overflowWrap: "anywhere",
                }}
                className=" outline-0 rounded-1  min-h-[50px] max-h-[125px] mx-[8px] my-auto bg-[#ffffff] overflow-auto"
                role="textbox"
                aria-multiline="true"
                contenteditable="true"

              >{recognizedText}</div>
              <div className=" mr-[9px]  flex flex-col justify-center">
                <div className="basis-2/4   ">
                  <button onClick={handleSubmit}>
                  <img
                    className=" w-[40px] h-[40px]"
                    src="https://img.icons8.com/metro/50/sent.png"
                    alt="sent--v1"
                    style={{
                      padding: "10px",
                      borderRadius: "21px",
                      background: "#63fd63",
                    }}
                  /></button>
                </div>
              </div>

              {/* <div className="basis-1/4 bg-[#ffab12]"></div> */}
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default EditInterview;

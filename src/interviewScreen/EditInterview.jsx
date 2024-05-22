import React from "react";
import { useRef, useState } from "react";
import { ReactMic } from "react-mic";
import Webcam from "react-webcam";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import Navbar from "../components/Navbar";
import { TextField, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./Main.css";
import SenderChat from "./SenderChat";
import ReceiverChat from "./ReceiverChat";
import Visualizer from "../components/Visualizer";
import NewHomeBackgrounnd from "../components/newHome";
import Timer from "./Timer";

const EditInterview = () => {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const recorderControls = useAudioRecorder();
  const [blob, setBlob] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editable, setEditable] = useState(false);

  const [edit, setEdit] = useState(false);

  const [mic, setMic] = useState(0);
  const [cam, setCam] = useState(0);

  const [recordings, setRecordings] = useState([]);
  const audioChunk = useRef([]);
  const [file, setFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  const startRecording = async () => {
    setVisible(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunk.current.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunk.current, { type: "audio/wav" });
      console.log(audioBlob);
      setBlob(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordings((prevRecs) => [...prevRecs, audioUrl]);
    };
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setVisible(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const onData = (recordedData) => {
    console.log("Recorded data: ", recordedData);
  };

  const onStop = (recordedData) => {
    setAudioBlob(recordedData.blob);
  };

  const handleMic = () => {
    setMic(1 - mic);
  };

  const handleCam = () => {
    setCam(1 - cam);
  };
  const handleFile = (e) => {
    const files = e.target.files[0];
    setFile(files);
  };
  const handleSubmit = async () => {
    var myBlob = new Blob([blob], { type: "audio/wav" });
    console.log(myBlob);
    console.log("Blob size:", myBlob.size);
    console.log("Blob type:", myBlob.type);
    const formData = new FormData();
    formData.append("audio", myBlob);
    console.log([...formData.entries()]);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/convert-audio-to-text/",
        {
          method: "POST",
          // headers:{
          //   "content-type": "multipart/form-data",
          // },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to convert audio to text");
      }

      const data = await response.json();
      console.log("Converted text:", data.text);
    } catch (error) {
      console.error("Error converting audio to text:", error.message);
    }
  };
  const handleEdit = () => {
    setEditable(true);
  };

  // const enableWebcam = () => this.setState({ webcamEnabled: true });

  return (
    <div className="relative flex flex-row h-screen    justify-around ">
      <div className="fixed top-0 left-0 z-[-10]">
        <NewHomeBackgrounnd />
      </div>
      <div className="relative  bg-white-500 justify-between basis-1/4 h-full my-auto  flex flex-col my-2  ">
        <div className="pt-[45px]  relative rounded basis-2/4 min-h-[250px] w-full min-w-40 mx-auto ">
          {cam === 1 ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              className=" z-0 w-full h-full object-cover  my-auto"
            />
          ) : (
            <div></div>
          )}

          <div className="z-0 absolute flex flex-inline bottom-3 w-full justify-center">
            {mic === 1 ? (
              <div className="mx-3 " onClick={() => handleMic()}>
                <img
                  width="16"
                  height="16"
                  src="https://img.icons8.com/tiny-color/16/microphone.png"
                  alt="microphone"
                />
              </div>
            ) : (
              <div className="mx-3" onClick={() => handleMic()}>
                <img
                  width="16"
                  height="16"
                  src="https://img.icons8.com/tiny-color/16/block-microphone.png"
                  alt="block-microphone"
                />
              </div>
            )}

            {cam === 1 ? (
              <div className=" " onClick={() => handleCam()}>
                <img
                  width="18"
                  height="18"
                  src="https://img.icons8.com/ios-filled/50/228BE6/video-call.png"
                  alt="video-call"
                />
              </div>
            ) : (
              <div className=" " onClick={() => handleCam()}>
                <img
                  width="18"
                  height="18"
                  src="https://img.icons8.com/color-glass/48/no-video.png"
                  alt="no-video"
                />
              </div>
            )}

            {/* VIDEO OFF*/}

            {/* VIDEO ON */}
          </div>
        </div>
        <div
          id="ttos"
          className="rounded-full mt-0.5 min-h-[250px] basis-2/4 w-full min-w-40 mx-auto bg-black"
        >
          {/* <img
            src="https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-3d-illustration-avatar-profile-man-png-image_9945214.png"
            className=" relative w-full object-contain h-full"
          /> */}
          <Visualizer />
        </div>
      </div>
      <div className="bg-black-500 min-h-[500px]  relative justify-around h-full basis-3/4 flex flex-col  my-auto mx-auto ">
        <div className=" customScrollNav flex flex-col rounded h-full mt-[42px]  lg:mx-auto   z-10 ">
          <SenderChat
            Text={
              "Hey! I'm Doraemon. Let's start the interview.\n What is polymorphism in Java?"
            }
          />

          <ReceiverChat
            Text={
              "having different forms. Like method overloading and overriing are there in java"
            }
            editable={edit}
          />

          <SenderChat Text={"Where is string stored in Java?"} />

          <ReceiverChat Text={"String pool"} />

          <SenderChat Text={"Thanks for taking the test "} />
        </div>

        {/* <div className='absolute blur-3xl w-[150px] h-[150px] bg-[#80BD8D] -top-4 right-[2.625rem] '></div>

  <div className='absolute blur-3xl w-[150px] h-[150px] bg-[#80BD8D] -bottom-4 right-[2.625rem]  '></div>  */}
      </div>
    </div>
  );
};

export default EditInterview;
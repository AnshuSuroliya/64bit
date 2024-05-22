import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { getTokenOrRefresh } from './../components/token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { TextField, Button, CircularProgress } from "@mui/material"; // Import CircularProgress
import NewHomeBackgrounnd from "../components/newHome";
import VisualizerCopy from "../components/Visualizeropy";
import { useDispatch, useSelector } from "react-redux";
import { interviewQuestion } from "../reducers/interviewReducer";
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

const Main = () => {
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

    useEffect(() => {
        return () => {
            if (speechRecognizer) {
                speechRecognizer.close();
            }
        }
    }, [speechRecognizer]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        const req = {
            prevMessages: response.messages,
            answer: recognizedText,
            scores: scores,
            name: "anshu",
            skill: "Java"
        };
        console.log(req);
        await dispatch(interviewQuestion(req));
        setLoading(false);
        setRecognizedText("");
        setShowSpeakButton(true);
        setEditable(false);
    };

    const handleEdit = () => {
        setEditable(true);
    };

    const startInterview = async () => {
        setLoading(true); // Start loader
        const req = {
            name: "anshu",
            skill: "Java",
            
        };
        await dispatch(interviewQuestion(req));
        setLoading(false); 
        setShowSpeakButton(true)// Stop loader
        setInterviewStarted(true);
    };

    return (
        <div className="w-full min-h-screen flex items-center">
            <div className="fixed top-0 left-0 z-[-10]">
                <NewHomeBackgrounnd />
            </div>
            <div className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-6/12 p-4 md:p-10 flex flex-col items-center justify-center">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        className="rounded-xl w-11/12 md:w-6/12 shadow-2xl shadow-[#72738b]"
                    />
                    <div className="w-11/12 md:w-6/12 rounded-xl shadow-2xl bg-black mt-12 flex justify-center">
                        <VisualizerCopy interviewStarted={interviewStarted} />
                    </div>
                </div>
                <div className="w-full md:w-5/12 h-full mt-8 rounded-xl shadow-2xl shadow-[#5e8d8d] bg-stone-700 p-4 md:mr-10 flex flex-col justify-center">
                    {loading ? ( 
                        <div className="flex justify-center items-center h-full">
                            <CircularProgress />
                        </div>
                    ) : (
                        <form method="POST" onSubmit={handleSubmit} className="flex flex-col justify-center w-full">
                            <TextField
                                id="multiline-static"
                                multiline
                                rows={4}
                                value={response.question}
                                placeholder="Question"
                                disabled
                                className="bg-white mt-6 md:mt-24 w-full rounded-xl"
                            />
                            <div className="mt-10">
                                <TextField
                                    id="multiline-static"
                                    value={recognizedText}
                                    multiline
                                    rows={4}
                                    placeholder="Your Answer..."
                                    onChange={(e) => setRecognizedText(e.target.value)}
                                    disabled={!editable}
                                    className="bg-white w-full rounded-xl mt-12 text-black font-bold"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row items-center mt-20 md:ml-12 space-y-4 md:space-y-0 md:space-x-4">
                                {isRecording ? (
                                    <>
                                        <div className="flex-1 bg-gray-100 p-2 rounded" defaultValue={displayText}>{recognizedText}</div>
                                        <Button onClick={handleStop} variant="contained" color="secondary">
                                            Stop
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {showSpeakButton && (
                                            <Button onClick={sttFromMic} variant="contained" color="primary">
                                                Speak Answer
                                            </Button>
                                        )}
                                        {!showSpeakButton && recognizedText && (
                                            <>
                                                <Button onClick={handleEdit} variant="contained" color="primary">
                                                    Edit
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary">
                                                    Submit
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </form>
                    )}
                    {!interviewStarted && !loading && (
                        <Button onClick={startInterview} variant="contained" color="primary" className="mt-10">
                            Start Interview
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;

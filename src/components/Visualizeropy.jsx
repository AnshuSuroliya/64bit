import React, { useEffect, useState } from "react";
import "./visualizer.css";
import { useSelector, useDispatch } from "react-redux";
import { interviewQuestion } from "../reducers/interviewReducer";

const VisualizerCopy = ({ interviewStarted }) => {
  const [audioUrl, setAudioUrl] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.interview.questionsData);
  let canvas = null;
  let ctx = null;
  let context = null;
  let analyser = null;
  let freqs = null;

  // useEffect(() => {
  //   if (interviewStarted) {
  //     start();
  //   }
  // }, [interviewStarted]);
  const audio=localStorage.getItem("audio")
  useEffect(() => {
    if(interviewStarted){
    if (audio) {
      playAudio(audio);
    }
  }
  }, [interviewStarted,audio]);

  const opts = {
    smoothing: 0.6,
    fft: 8,
    minDecibels: -70,
    scale: 0.2,
    glow: 10,
    color1: [203, 36, 128],
    color2: [41, 200, 192],
    color3: [24, 137, 218],
    fillOpacity: 0.6,
    lineWidth: 1,
    blend: "screen",
    shift: 50,
    width: 60,
    amp: 1,
  };

  function range(i) {
    return Array.from(Array(i).keys());
  }

  const shuffle = [1, 3, 0, 4, 2];

  function freq(channel, i) {
    const band = 2 * channel + shuffle[i] * 6;
    return freqs[band];
  }

  function scale(i) {
    const x = Math.abs(2 - i);
    const s = 3 - x;
    return (s / 3) * opts.amp;
  }

  function path(channel) {
    const color = opts[`color${channel + 1}`].map(Math.floor);
    ctx.fillStyle = `rgba(${color}, ${opts.fillOpacity})`;
    ctx.strokeStyle = ctx.shadowColor = `rgb(${color})`;
    ctx.lineWidth = opts.lineWidth;
    ctx.shadowBlur = opts.glow;
    ctx.globalCompositeOperation = opts.blend;

    const m = 400 / 2;
    const offset = (600 - 15 * opts.width) / 2;
    const x = range(15).map(i => offset + channel * opts.shift + i * opts.width);
    const y = range(5).map(i => Math.max(0, m - scale(i) * freq(channel, i)));
    const h = 2 * m;

    ctx.beginPath();
    ctx.moveTo(0, m);
    ctx.lineTo(x[0], m + 1);

    ctx.bezierCurveTo(x[1], m + 1, x[2], y[0], x[3], y[0]);
    ctx.bezierCurveTo(x[4], y[0], x[4], y[1], x[5], y[1]);
    ctx.bezierCurveTo(x[6], y[1], x[6], y[2], x[7], y[2]);
    ctx.bezierCurveTo(x[8], y[2], x[8], y[3], x[9], y[3]);
    ctx.bezierCurveTo(x[10], y[3], x[10], y[4], x[11], y[4]);

    ctx.bezierCurveTo(x[12], y[4], x[12], m, x[13], m);

    ctx.lineTo(600, m + 1);
    ctx.lineTo(x[13], m - 1);

    ctx.bezierCurveTo(x[12], m, x[12], h - y[4], x[11], h - y[4]);
    ctx.bezierCurveTo(x[10], h - y[4], x[10], h - y[3], x[9], h - y[3]);
    ctx.bezierCurveTo(x[8], h - y[3], x[8], h - y[2], x[7], h - y[2]);
    ctx.bezierCurveTo(x[6], h - y[2], x[6], h - y[1], x[5], h - y[1]);
    ctx.bezierCurveTo(x[4], h - y[1], x[4], h - y[0], x[3], h - y[0]);
    ctx.bezierCurveTo(x[2], h - y[0], x[1], m, x[0], m);

    ctx.lineTo(0, m);

    ctx.fill();
    ctx.stroke();
  }

  function visualize() {
    analyser.smoothingTimeConstant = opts.smoothing;
    analyser.fftSize = Math.pow(2, opts.fft);
    analyser.minDecibels = opts.minDecibels;
    analyser.maxDecibels = 0;
    analyser.getByteFrequencyData(freqs);

    if (canvas == null) {
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
    }

    canvas.width = 600;
    canvas.height = 400;

    path(0);
    path(1);
    path(2);

    requestAnimationFrame(visualize);
  }

  async function playAudio(audioUrl) {
    context = new AudioContext();
    analyser = context.createAnalyser();
    freqs = new Uint8Array(analyser.frequencyBinCount);
    
    try {
      console.log(audioUrl);
      const fetchedAudioUrl = await fetch(`http://127.0.0.1:8000${audio}`);
      const arrayBuffer = await fetchedAudioUrl.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyser);
      source.connect(context.destination);
      source.start();
      requestAnimationFrame(visualize);
    } catch (error) {
      console.error("Error fetching or decoding audio data:", error);
    }
  }

  // async function start() {
  //   const req = {
  //     name: "anshu",
  //     skill: "Java"
  //   };
  //   await dispatch(interviewQuestion(req));
  // }

  return (
    <div className="mt-16">
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default VisualizerCopy;

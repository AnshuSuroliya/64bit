import React from "react";
import "./Timer.css";

function Timer({ onclick, start, end }) {
  return (
    <div className="w-full h-[45px] bg-[#930fffd1] z-30 top-0  fixed top-0 left-0  flex justify-end ">
      {/* <div className=" z-20 h-[40px] p-[8px] rounded-xl border-[0.5px] border-white bg-[#050505]/[0.35]">
        <div className="text-white">10:00</div>
      </div> */}

      <div className="custom bg-white m-[5px] p-[5px] px-[8px] font-sans text-[13px]">
        10:00
      </div>

      {!start ? (
        <div
          onClick={onclick}
          className="custom bg-[#63fd63] m-[5px] p-[5px] px-[8px] font-sans text-[13px]"
        >
          Start Interview
        </div>
      ) : (
        <div
          onClick={onclick}
          style={{
            background: "#ff5858",
            color: "white",
            textShadow: "0 0 9px black",
          }}
          className="custom  m-[5px] p-[5px] px-[8px] font-sans text-[13px]"
        >
          End Interview
        </div>
      )}
    </div>
  );
}

export default Timer;

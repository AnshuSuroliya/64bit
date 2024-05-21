import React from "react";

function Timer() {
  return (
    <div className="w-full h-[45px] bg-white z-30 top-0  fixed top-0 left-0  flex justify-center ">
      {/* <div className=" z-20 h-[40px] p-[8px] rounded-xl border-[0.5px] border-white bg-[#050505]/[0.35]">
        <div className="text-white">10:00</div>
      </div> */}

      <div className="bg-black  text-white">10:00</div>
    </div>
  );
}

export default Timer;

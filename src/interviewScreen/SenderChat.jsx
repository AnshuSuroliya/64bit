import React from "react";

const SenderChat = ({ Text }) => {
  return (
    <div className=" relative flex my-1 mb-3">
      <div className=" h-full ">
        <img
          src="https://image.pngaaa.com/436/4948436-middle.png"
          alt="icon"
          className="icon-sm rounded-xl  mx-2 h-[24px] w-[24px]"
          style={{ background: "rgb(121,137,255)" }}
        />
      </div>

      <div className="flex flex-col">
        <div className="text-start text-white ">Doraemon</div>
        <div
          className="text-white text-start font-sans  p-3.5 ml-2 mr-7  rounded flex self-start "
          style={{ overflowWrap: "anywhere" }}
        >
          {Text}
        </div>
      </div>
    </div>
  );
};

export default SenderChat;

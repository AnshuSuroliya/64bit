import React from "react";

const SenderChat = ({ Text }) => {
  return (
    <div className=" relative flex my-1 mb-3">
      <div className=" h-full ">
        {/* <img
          src="https://image.pngaaa.com/436/4948436-middle.png"
          alt="icon"
          className="icon-sm rounded-xl  mx-2 h-[24px] w-[24px]"
          style={{ background: "rgb(121,137,255)" }}
        /> */}

        <img
          width="24"
          height="24"
          src="https://img.icons8.com/ios/50/door.png"
          alt="door"
          className="h-[24px] w-[24px] min-w-[24px]"
        />
        {/* 
        <img
          width="40"
          height="40"
          src="https://image.pngaaa.com/436/4948436-middle.png"
          alt="door"
        /> */}
      </div>

      <div className="flex flex-col">
        <div className="text-start text-white">Doraemon</div>
        <div
          className=" text-white text-start font-sans  p-3.5 ml-2 mr-7  rounded flex self-start "
          style={{
            overflowWrap: "anywhere",
            boxShadow: "#9c6aab 4px 3px 13px 0px",
          }}
        >
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/quill/50/arrow.png"
            alt="arrow"
            className="top-0 h-[20px] "
          />
          {Text}
        </div>
      </div>
    </div>
  );
};

export default SenderChat;

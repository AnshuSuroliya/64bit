import React from "react";

const ReceiverChat = ({ Text }) => {
  return (
    <div className=" relative flex my-1">
      <div className=" h-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="icon-sm rounded-xl p-[4px] mx-2"
          style={{ background: "rgb(121,137,255)" }}
        >
          <path
            fill="white"
            fill-rule="evenodd"
            d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7m5 8c-3.656 0-6.5 2.75-6.5 6a1 1 0 1 1-2 0c0-4.482 3.872-8 8.5-8s8.5 3.518 8.5 8a1 1 0 1 1-2 0c0-3.25-2.844-6-6.5-6"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="text-start text-white ">You</div>
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

export default ReceiverChat;

import React from "react";

const ReceiverChat = ({ Text }) => {
  if (!Text || Text.trim().length === 0) {
    return <div></div>;
  }

  return (
    
    <div className=" relative flex my-1 mb-3">
   
      <div className=" h-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="h-[24px] w-[24px] min-w-[24px] rounded-2xl p-1"
          style={{ background: "#543c67" }}
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

export default ReceiverChat;

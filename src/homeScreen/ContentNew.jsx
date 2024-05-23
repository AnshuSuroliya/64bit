import { useState } from "react";

const ContentNew = () => {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  return (
    <div className="w-full ">
      <div className="bg-[#dabfe5] p-[26px] w-full flex max-md:flex-col-reverse">
        <div className="w-6/12 ml-8 max-md:w-full flex flex-col justify-center">
          <div className="text-3xl font-bold text-justify">
            What is Mockito?
          </div>
          <p className="text-lg mt-2 w-11/12 text-justify items-left">
            Your virtual interview companion, empowering you to sharpen your
            skills, build confidence, and conquer your career goals one
            interview at a time. Step into the future of preparation with our
            AI-driven platform, tailored to elevate your performance and unlock
            your full potential.
          </p>
        </div>
        <img
          src="https://www.ttnews.com/sites/default/files/styles/article_full_width_image/public/2023-09/iTECH-Dysart-1200.jpg"
          className="md:w-5/12 rounded-xl md:ml-8 max-md:w-[87%] mx-auto max-md:mb-[2.75rem]"
        />
      </div>

      <div className="bg-[#dabfe5] p-[26px] w-full flex max-md:flex-col">
        <img
          src="https://www.pngmart.com/files/21/Job-Interview-Vector-Transparent-PNG.png"
          className="md:w-5/12 rounded-xl md:ml-8 max-md:w-[87%] mx-auto max-md:mb-[2.75rem]"
        />
        <div className="w-6/12 ml-8 max-md:w-full flex flex-col justify-center">
          <div className="text-3xl font-bold text-justify">
            What is Mockito?
          </div>
          <p className="text-lg mt-2 w-11/12 text-justify items-left">
            Your virtual interview companion, empowering you to sharpen your
            skills, build confidence, and conquer your career goals one
            interview at a time. Step into the future of preparation with our
            AI-driven platform, tailored to elevate your performance and unlock
            your full potential.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContentNew;

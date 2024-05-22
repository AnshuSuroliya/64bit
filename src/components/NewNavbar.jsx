import { useState } from "react";
import { useEffect} from "react";
import {useNavigate ,Link} from 'react-router-dom';

const NewNavbar = () => {
  const navigate = useNavigate();
  let characters = null;
  let index = 0;
  const [topActive, setTopActive] = useState(window.innerWidth >= 768);
  const [sideActive, setSideActive] = useState(false);

  window.onresize = (e) => {
    if(topActive==true && window.innerWidth <= 768){
      setTopActive(false);
    }
    else if(topActive==false && window.innerWidth >= 768){
      setTopActive(true);
    }
  };

   function goTo(path){
        navigate(path);
    }

  useEffect(() => {
    let doc = document.getElementById("logo");
    if (doc != null) {
      characters = doc.querySelectorAll("p");
      setTimeout(() => {
        startanimating();
      }, 1000);
    }
  }, []);

  function startanimating() {
    characters[
      (index - 1 + characters.length) % characters.length
    ]?.classList.remove("text-blue-600", "-translate-y-1");
    characters[index]?.classList.add("text-blue-600", "-translate-y-1");
    index = (index + 1) % characters.length;
    setTimeout(() => {
      startanimating();
    }, 300);
  }

  return (
    <div id="navbar" className="w-screen flex fixed top-0 left-0 z-[1000]">
      {topActive ? (
        <div className="mx-auto flex">
          <div className="my-[15px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap">
            <Link to="/schedule/false" className="text-md group-hover/baap:text-xl transition-all duration-400">
              Schedule Now
            </Link>
            <div className="w-0 ms-[15px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[120px] shadow-[0_35px_35px_rgba(255,255,255,1)] transition-all duration-400"></div>
          </div>
          <div className="my-[15px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap">
            <Link to="/schedule/true" className="text-md group-hover/baap:text-xl transition-all duration-400">
              Start Mock
            </Link>
            <div className="w-0 ms-[25px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[100px] transition-all duration-400"></div>
          </div>

          <Link
            id="logo"
            className="flex mx-auto hover:cursor-pointer text-white text-2xl py-2"
            to="/"
          >
            <p className="my-auto transtion-all duration-200">D</p>
            <p className="my-auto transtion-all duration-200">O</p>
            <p className="my-auto transtion-all duration-200">R</p>
            <p className="my-auto transtion-all duration-200">A</p>
            <p className="my-auto transtion-all duration-200">E</p>
            <p className="my-auto transtion-all duration-200">M</p>
            <p className="my-auto transtion-all duration-200">O</p>
            <p className="my-auto transtion-all duration-200">N</p>
          </Link>

          <div className="my-[15px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap">
            <button className="text-md group-hover/baap:text-xl transition-all duration-400">
              Insights
            </button>
            <div className="w-0 ms-[35px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[80px] transition-all duration-400"></div>
          </div>
          <div className="my-[15px] w-[150px] text-lg text-white hover:cursor-pointer flex flex-col group/baap">
            <button className="text-md group-hover/baap:text-xl transition-all duration-400">
              Profile
            </button>
            <div className="w-0 ms-[40px] h-[2px] bg-gradient-to-r from-red-500 to-indigo-500 group-hover/baap:w-[70px] transition-all duration-400"></div>
          </div>
        </div>
      ) : (
        <div className="w-screen flex flex-col">
          <div className="flex w-full h-[70px]">
            <div className="flex hover:cursor-pointer text-white text-2xl py-3 ps-4">
              <p className="my-auto transtion-all duration-200">D</p>
              <p className="my-auto transtion-all duration-200">O</p>
              <p className="my-auto transtion-all duration-200">R</p>
              <p className="my-auto transtion-all duration-200">A</p>
              <p className="my-auto transtion-all duration-200">E</p>
              <p className="my-auto transtion-all duration-200">M</p>
              <p className="my-auto transtion-all duration-200">O</p>
              <p className="my-auto transtion-all duration-200">N</p>
            </div>

            {sideActive ? (
              <div
                className="flex flex-col my-auto ms-auto me-6 py-6 px-6 hover:cursor-pointer relative"
                onClick={() => {
                  setSideActive(false);
                }}
              >
                <span className="h-[2px] w-[30px] bg-white rotate-45  right-2 absolute top-[50%]"></span>
                <span className="h-[2px] w-[30px] bg-white -rotate-45 right-2 absolute top-[50%]"></span>
              </div>
            ) : (
              <div
                className="flex flex-col my-auto ms-auto me-6 px-6 py-6 hover:cursor-pointer relative"
                onClick={() => {
                  setSideActive(true);
                }}
              >
                <span className="h-[2px] w-[30px] bg-white right-2 absolute top-[30%]"></span>
                <span className="h-[2px] w-[30px] bg-white right-2 absolute top-[50%]"></span>
                <span className="h-[2px] w-[30px] bg-white right-2 absolute top-[70%]"></span>
              </div>
            )}
          </div>
          <div className="w-screen -translate-x-[110%]"></div>
        </div>
      )}
    </div>
  );
};
export default NewNavbar;

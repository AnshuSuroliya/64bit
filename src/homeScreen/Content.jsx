import { useEffect } from "react";
import { Link } from "react-router-dom";
import photo from "../assets/hand.png";

const Content = () => {
  let txtArray = [];
  let ind = 0;
  var tmout = null;
  useEffect(() => {
    txtArray = document.getElementById("textchanger").querySelectorAll("h1");
    if (tmout != null) {
      clearTimeout(tmout);
    }
    setTimeout(animate, 500);
  }, []);

  async function animate() {
    let prev_ind = ind - 1;
    if (ind == 0) {
      prev_ind = txtArray.length - 1;
    }

    txtArray[prev_ind]?.classList.add("-translate-x-[400px]");
    txtArray[ind]?.classList.remove("-translate-x-[400px]");

    ind = (ind + 1) % txtArray.length;
    tmout = setTimeout(animate, 2000);
  }

  return (
    <div className="w-screen h-screen z-[100]">
      <div className="flex flex-col mt-[100px] md:mt-[200px] text-start px-3 md:px-6">
        <h1 className="text-2xl md:text-5xl text-white font-semibold mb-4 z-[100]">
          Everythin you need to
        </h1>
        <div id="textchanger" className="flex h-[50px] relative transition-all">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-300 absolute top-0 left-0 -translate-x-[400px] transition-all duration-200">
            Be Interview Ready
          </h1>
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-300 absolute top-0 left-0 -translate-x-[400px] transition-all duration-200">
            LevelUp Yourself
          </h1>
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-300 absolute top-0 left-0 -translate-x-[400px] transition-all duration-200">
            Access Yourself
          </h1>
        </div>
        <Link
          className="px-3 py-2 text-white border-blue-200 border-2 w-[150px] rounded-lg z-[100] hover:shadow-[4px_4px_1px_-0px_rgba(255,255,255,1)]"
          to="/schedule"
        >
          Schedule Now
        </Link>
      </div>
    </div>
  );
};

export default Content;

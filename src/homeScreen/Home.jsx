import Content from "./Content";
import Navbar from "../components/Navbar";
import NewHomeBackgrounnd from "../components/newHome";
import NewNavbar from "../components/NewNavbar";
import NewContent from "./NewContent";
import ContentNew from "./ContentNew";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <NewNavbar />

      <div className="relative">
        <div className=" absolute top-0 left-0 ">
          <NewHomeBackgrounnd className="absolute top-0 left-0 bg-[#23242a]" />
        </div>
        <div className="absolute top-0 left-0 ">
          <Content />
        </div>
      </div>

      <div className="w-screen md:h-screen h-[500px] "></div>
      <div className=" w-full min-h-screen overflow-x-hidden flex flex-col z-50">
        <ContentNew />
        {/* <NewContent /> */}
        <Footer />
      </div>
    </div>
  );
};
export default Home;

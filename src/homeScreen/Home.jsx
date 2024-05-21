import Content from "./Content";
import Navbar from "../components/Navbar";
import NewHomeBackgrounnd from "../components/newHome";
import NewNavbar from "../components/NewNavbar";
import NewContent from "./NewContent";
import Footer from "../footer/Footer";

const Home=()=>{
    return(
        <div className="flex flex-col">
            <NewNavbar/>
            <NewHomeBackgrounnd className="fixed top-0 left-0 bg-[#23242a]"/>
            <div className=" fixed top-0 left-0 ">
            <Content />
            </div>
            <div className="w-full min-h-screen overflow-x-hidden flex flex-col z-50">
                <NewContent/>
                <Footer/>
            </div>
        </div>
    )
}
export default Home;
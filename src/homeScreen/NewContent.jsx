import { useState } from "react";

const NewContent=()=>{
    const [show1,setShow1]=useState(true);
    const [show2,setShow2]=useState(false);
    const [show3,setShow3]=useState(false);
return(
    <div className="w-full p-4 bg-white">
        <div className="w-full flex">
            <div className="w-6/12 ml-8">
                <div className="text-3xl font-bold">What is Doraemon?</div>
                <p className="text-lg mt-2 w-11/12 text-justify items-left">Mockito is a AI based Interview platform. Interviewers can schedule the interviews for th candidates and it can be 
                used by candidates also to give mock interviews on various technologies.</p>
            </div>
            <img src="https://www.ttnews.com/sites/default/files/styles/article_full_width_image/public/2023-09/iTECH-Dysart-1200.jpg" className="w-5/12 rounded-xl ml-8"/>
        </div>
        <div className="w-full p-4 mt-20">
            <h2 className="text-3xl font-bold">Features</h2>
            <div className="w-full flex p-4 mt-8">
                <div className="w-4/12 h-72 rounded-xl bg-gray-300 ml-24">

                </div>
                <div className="w-4/12 ml-44 border-t-2 ">
                    <div className="border-b-2 p-8">
                    <button className="text-xl text-black flex font-bold items-start " onClick={()=>setShow1(!show1)}><div className={`rounded-full  border-2 border-blue-400 px-2 mr-4 ${show1 ? 'bg-blue-400 text-white' :'text-blue-400 '}`}>1</div>Face detection</button>
                    {show1 ? <div className="">This is a its content</div> : <div></div>}
                    </div>
                    <div className="border-b-2 p-8 ">
                   <button className="text-xl text-black flex font-bold" onClick={()=>setShow2(!show2)}> <div className={`rounded-full  border-2 border-blue-400 px-2 mr-4 ${show2 ? 'bg-blue-400 text-white' :'text-blue-400 '}`}>2</div>Object Tracking</button>
                    
                    {show2 ? <div>This is a its content</div> : <div></div>}
                    </div>
                    <div className="border-b-2 p-8 ">
                    <button className="text-xl text-black flex font-bold" onClick={()=>setShow3(!show3)}><div className={`rounded-full  border-2 border-blue-400 px-2 mr-4 ${show3 ? 'bg-blue-400 text-white' :'text-blue-400 '}`}>3</div>Image Recognition</button>
                    {show3 ? <div>This is a its content</div> : <div></div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
export default NewContent;
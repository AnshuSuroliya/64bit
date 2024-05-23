import { useEffect, useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import NewNavbar from "../components/NewNavbar.jsx";
import NewHomeBackgrounnd from "../components/newHome.jsx"
import axios from "axios";

const Schedule=()=>{
    let {mock} =useParams();

    const router = useNavigate()
    const [candidateName,setCandidateName]=useState("");
    const [candidateEmail,setCandidateEmail]=useState("");
    const [startTime,setStartTime]=useState(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
    const [startNow,setStartNow]=useState(mock);
    const [interviewDuration,setInterviewDuration] =useState(20);
    const [currentWindow,setCurrentWindow] =useState("SkillList");
    const [skills,setSkill] =useState( [])

    useEffect(()=>{setStartNow(mock);},[])

    const skillOptions = ["HTML","CSS","JavaScript","React","Redux","Java","C++"];
    const expRange = [1,2,3,4,5,6,7,8,9,10];
    const questionRange = [1,2,3,4,5,6,7];

    
    //NewSkillModal && UpdateSkilModal Starts Here-----------------
    const [question,setQuestion]=useState()
    const [newQuestion,setNewQuestion] =useState(false);
    const [skillInput,setSkillInput]=useState({name:" ",experience:0,totalQuestion:5,questions:[] })
    const [currentIndex,setCurrentIndex]=useState(0);

    function verifyEmail(e) {
        const display = document.querySelector("#emailError");
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{2,6}$/.test(e.target.value)==false) {
          display.hidden =false;} else {
          display.hidden=true;
        }
    }

    const changeExperience=(i)=>{
        if(skillInput.experience>=25 && i>0)return;
        if(skillInput.experience<=0 && i<0)return;
        setSkillInput({name:skillInput.name,experience:skillInput.experience+i,questions:skillInput.questions,totalQuestion:skillInput.totalQuestion});
    }

    const saveInLocalStorage=(temp)=>{
        let savedData = JSON.stringify(temp)
        localStorage.setItem("SavedData",savedData);
    }

    const addQuestion=async ()=>{
        let questionError = question==null || question.length<2
        document.getElementById("questionErrorElement").hidden =true;
        try{
            const {data} = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/chk/IsQuestionReleveant',
            data: {"question": question , "skill":skillInput.name}
            })
            if(data["isRelevant"]=="False" || data["isRelevant"]==false)questionError =true;

            if(questionError){
                document.getElementById("questionErrorElement").hidden =false;
                return;
            }
        }catch(error){
            document.getElementById("questionErrorElement").hidden =false;
            return;
        }
        


        document.getElementById("questionErrorElement").hidden =true;
        let temp =skillInput;
        temp.questions.push({question:question});
        if(temp.questions.length>temp.totalQuestion){temp.totalQuestion =temp.questions.length}
        setSkillInput(temp);
        setQuestion("");
        setNewQuestion(false);
    }
    
    const AddNewSkill=()=>{
        let ShowError =skillInput.name.length<2 && skillInput.name!="Choose Skill";

        for(let i=0;i<skills.length;i++){
            if(skills[i].name==skillInput.name){ShowError=true;break;}
        }

        if(ShowError ){
            document.getElementById("SkillSelector").classList.add("border-red-400")
        return;
        }else{document.getElementById("SkillSelector").classList.remove("border-red-400")}
       
        let temp = [...skills];
        temp.push(skillInput);
        setSkill(temp);
        setSkillInput({name:"",experience:0,questions:[],totalQuestion:5 });
        setQuestion("");
        setNewQuestion(false);
        setCurrentWindow("SkillList");
        saveInLocalStorage(temp);
    }

    const UpdateSkill=()=>{
        let temp =[...skills]
        temp[currentIndex].name =skillInput.name;
        temp[currentIndex].experience=skillInput.experience;
        temp[currentIndex].questions =skillInput.questions;
        temp[currentIndex].totalQuestion =skillInput.totalQuestion;
        setSkill(temp);
        setSkillInput({name:"",experience:0,questions:[] ,totalQuestion:5 });
        setQuestion("");
        setNewQuestion(false);
        setCurrentWindow("SkillList");
        saveInLocalStorage(temp);
    }

    const DeleteQuestion=(index)=>{
        let temp = skillInput.questions;
        temp.splice(index,1);
        setSkillInput({name:skillInput.name,experience:skillInput.experience,questions:temp,totalQuestion:skillInput.totalQuestion});
    }
   
    function newSkillModal() {
        return(
            <div id="skillInformationModal" className="ms-auto border-l-[1px] px-2 py-2 w-6/12 h-full flex flex-col">
                <div className="flex mb-3 flex-wrap">
                    <div className="w-5/12 relative m-2">
                        <select id="SkillSelector" value={skillInput.name} onChange={(e)=>{setSkillInput({name:e.target.value,experience:skillInput.experience,questions:skillInput.questions});}} className="w-full ps-6 py-[9px] text-gray-400 border-[1px] border-gray-900 text-center rounded-[4px] text-xl text-semibold focus:bg-gray-100" >
                            <option>Choose Skill</option>
                            {skillOptions.map((option, index) => {
                                return (
                                    <option key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="absolute -top-3 bg-white left-4 font-semibold text-gray-500">Skill</p>
                    </div>
                    
                    <div className="w-5/12 m-2 relative">
                        <select id="expSelector" value={skillInput.experience} onChange={(e)=>{setSkillInput({name:skillInput.name,experience:e.target.value,questions:skillInput.questions,totalQuestion:skillInput.totalQuestion});}} className="w-full ps-6 py-[9px] text-gray-400 border-[1px] border-gray-900 text-center rounded-[4px] text-xl text-semibold focus:bg-gray-100" >
                            
                            {expRange.map((exp, index) => {
                                return (
                                    <option key={index}>
                                        {exp}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="absolute -top-3 bg-white left-4 font-semibold text-gray-500">Experience</p>
                    </div>

                    <div className="w-5/12 relative m-2">
                        <select id="quesRange" value={skillInput.totalQuestion} onChange={(e)=>{setSkillInput({name:skillInput.name,experience:skillInput.experience,questions:skillInput.questions,totalQuestion:e.target.value});}} className="w-full ps-6 py-[9px] text-gray-400 border-[1px] border-gray-900 text-center rounded-[4px] text-xl text-semibold focus:bg-gray-100" >
                            
                            {questionRange.map((qnc, index) => {
                                return (
                                    <option key={index}>
                                        {qnc}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="absolute -top-3 bg-white left-4 font-semibold text-gray-500">Total Questions</p>
                    </div>
                </div>

                <div className="w-auto overflow-scroll mb-2">
                    {skillInput.questions.map((question, index) => {
                                    return (
                                        <div key={index} className="w-full relative">
                                            <button type="button" className="bg-red-300 p-1 absolute top-1 rounded-full right-1 text-xs" onClick={()=>DeleteQuestion(index)}>🗑️</button>
                                            <div style={{overflowWrap:"anywhere"}}  key={index} className="bg-gray-100 rounded-lg text-md font-semibold my-3 h-auto text-start p-2 pe-4" >{skillInput.questions[index].question}</div>
                                        </div>
                                    );
                    })}
                </div>
                
                {
                    newQuestion ? 
                    <div className="w-full mb-2">
                        
                            <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} className="bg-gray-100 w-full rounded-lg focus:outline-0 text-lg font-semibold px-2 py-1"></textarea>
                            <div className="flex ms-auto">
                                <p id="questionErrorElement" hidden={true} className="text-lg font-semibold text-red-700">Input Correct Question!</p>
                                <button type="button" onClick={()=>{setQuestion("");setNewQuestion(false)}} className="bg-red-200 ms-auto rounded-md p-1 w-[70px] me-2">cancel</button>
                                <button type="button" onClick={addQuestion} className="bg-green-200 ms-auto rounded-md p-1 w-[70px] ms-2">Add</button>
                            </div> 
                        
                    </div>  
                    :
                    <button type="button" onClick={()=>setNewQuestion(true)} className="bg-green-200 rounded-md px-3 py-1 w-[130px]">Add Question</button>
                }

                <div className="mt-auto w-full flex">
                    <button type="button" className=" mt-auto bg-red-500 px-3 py-1 rounded-md text-md font-semibold text-2xl text-gray-50" onClick={GoToSkillListModal} >Cancel</button>
                    <button type="button" className="ms-auto mt-auto bg-[#006D77] px-3 py-1 rounded-md text-md font-semibold text-2xl text-gray-50" onClick={AddNewSkill} >Add Skill</button>
                </div>
            </div>
        )
    }

    function updateSkillModal() {
        return(
            <div id="skillInformationModal" className="ms-auto border-l-[1px] px-2 py-2 w-6/12 h-full flex flex-col">
                <div className="flex mb-3 flex-wrap">
                    <div className="w-5/12 relative m-2">
                        <select id="SkillSelector" value={skillInput.name} onChange={(e)=>{setSkillInput({name:e.target.value,experience:skillInput.experience,questions:skillInput.questions,totalQuestion:skillInput.totalQuestion});}} className="w-full ps-6 py-[9px] text-gray-400 border-[1px] border-gray-900 text-center rounded-[4px] text-xl text-semibold focus:bg-gray-100" >
                        <option>Choose Skill</option>
                            {skillOptions.map((option, index) => {
                                return (
                                    <option key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="w-5/12 m-2 relative">
                        <select id="expSelector" value={skillInput.experience} onChange={(e)=>{setSkillInput({name:skillInput.name,experience:e.target.value,questions:skillInput.questions,totalQuestion:skillInput.totalQuestion});}} className="w-full ps-6 py-[9px] text-gray-400 border-[1px] border-gray-900 text-center rounded-[4px] text-xl text-semibold focus:bg-gray-100" >
                            
                            {expRange.map((exp, index) => {
                                return (
                                    <option key={index}>
                                        {exp}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="absolute -top-3 bg-white left-4 font-semibold text-gray-500">Experience</p>
                    </div>

                    <div className="w-5/12 relative m-2">
                        <select id="quesRange" value={skillInput.totalQuestion} onChange={(e)=>{setSkillInput({name:skillInput.name,experience:skillInput.experience,questions:skillInput.questions,totalQuestion:e.target.value});}} className="w-full ps-6 py-[9px] text-gray-400 border-[1px] border-gray-900 text-center rounded-[4px] text-xl text-semibold focus:bg-gray-100" >
                            {questionRange.map((qnc, index) => {
                                return (
                                    <option key={index}>
                                        {qnc}
                                    </option>
                                );
                            })}
                        </select>
                        <p className="absolute -top-3 bg-white left-4 font-semibold text-gray-500">Total questions</p>
                    </div>

                </div>

                <div className="w-auto overflow-scroll mb-2">
                    {skillInput.questions.map((question, index) => {
                                    return (
                                        <div  key={index} className="bg-gray-100 rounded-lg text-md font-semibold my-3 h-auto text-start px-3" >{skillInput.questions[index].question}</div>
                                    );
                    })}
                </div>
                
                {
                    newQuestion ? 
                    <div className="w-full mb-2">
                        
                            <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} className="bg-gray-100 w-full rounded-lg focus:outline-0 text-lg font-semibold px-2 py-1"></textarea>
                            <div className="flex ms-auto">
                                <p id="questionErrorElement" hidden={true} className="text-lg font-semibold text-red-700">Input Correct Question!</p>
                                <button type="button" onClick={()=>{setQuestion("");setNewQuestion(false)}} className="bg-red-200 ms-auto rounded-md p-1 w-[70px] me-2">cancel</button>
                                <button type="button" onClick={addQuestion} className="bg-green-200 ms-auto rounded-md p-1 w-[70px] ms-2">Add</button>
                            </div> 
                        
                    </div>  
                    :
                    <button type="button" onClick={()=>setNewQuestion(true)} className="bg-green-200 rounded-md px-3 py-1 w-[130px]">Add Question</button>
                }

                <div className="mt-auto w-full flex">
                    <button type="button" className=" mt-auto bg-red-500 px-3 py-1 rounded-md text-md font-semibold text-2xl text-gray-50" onClick={GoToSkillListModal} >Cancel</button>
                    <button type="button" className="ms-auto mt-auto bg-[#006D77] px-3 py-1 rounded-md text-md font-semibold text-2xl text-gray-50" onClick={UpdateSkill} >Update Skill</button>
                </div>
            </div>
        )
    }


    // NewSkillModal && UpdateSkilModal Code Ends Here-------------------

    const GoToSkillListModal=()=>{
        setSkillInput({name:"",experience:0,questions:[] ,totalQuestion:5});
        setQuestion("");
        setNewQuestion(false);
        setCurrentWindow("SkillList");
    }

    const goToUpdateSkillWindow=(index)=>{
        setSkillInput({name:skills[index].name,experience:skills[index].experience,questions:skills[index].questions ,totalQuestion:skills[index].totalQuestion });
        setQuestion("");
        setNewQuestion(false);
        setCurrentWindow("UpdateSkill");
    }

    const DeleteSkill=(index)=>{
        let temp =[...skills];
        temp.splice(index,1);
        setSkill(temp);
        saveInLocalStorage(temp);
    }

    const ScheduleInterview=async ()=>{
        if(mock==="true"){
            setStartTime(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0])
        }
        const req = { candidate_name:candidateName , candidate_email : candidateEmail , start_time:startTime , duration:interviewDuration,  skills};
        const {data} = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/interview/schedule',
            data: req
        })
        if(data=="False" || data==false){
            return;
        }else{
           router("/interview/"+data["id"]) 
        }
    }


    function skillList(){
        return(
            <div id="skillInformationModal" className="border-l-[1px] px-2 py-2 w-6/12 h-full flex flex-col">                                        
                {skills && skills.map((skill,index)=>{
                    return(
                            <div key={index} className="w-full flex bg-[#EDF6F9] rounded-[4px] px-3 py-2 mb-3">
                                <div className="text-xl px-3 font-semibold">{skill["name"]}</div>
                                <button type="button" onClick={()=>DeleteSkill(index)} className="ms-auto text-sm bg-red-300 rounded-full px-1 mx-2">🗑️</button>
                                <button type="button" onClick={()=>{ goToUpdateSkillWindow(index)}} className="text-sm bg-gray-50 rounded-full px-2">&#10148;</button>
                            </div>
                    )})
                }
                <button type="button" onClick={()=>setCurrentWindow("NewSkill")} className="ms-auto bg-[#006D77] px-3 py-1 rounded-md text-md font-semibold text-gray-50">Add Skill</button>
            </div>
        )
    }


    return(
        <div className="w-full h-screen font-mono flex">
            <div className="fixed top-0 left-0 z-0">
                <NewHomeBackgrounnd/>
            </div>
            <div className="fixed top-0 left-0">
                <NewNavbar/>
            </div>
            <div className="w-10/12 h-[500px] rounded-lg bg-white  mx-auto mt-[100px]  p-4 px-6 z-[10]">
                <h2 className="text-3xl font-bold">Schedule Interview</h2>
                
                <div id="skillList" className="mx-auto py-4 px-2 h-[410px]">   
                    <div className="flex w-full h-full px-4 mb-2">
                        <div id="generalInformationModal" className="border-r-[1px] px-2 py-2 w-6/12 h-full">
                            <p hidden={true} className="text-red-500 text-md text-start" id="nameError">Only alphabates and space is allowed!</p>
                            <input type="text" className="w-full ps-6 py-2 mb-3 bg-[#EDF6F9] rounded-[4px] text-xl text-semibold" placeholder="Candidate Name" value={candidateName} onChange={(e)=>{setCandidateName(e.target.value);}} />
                            <p hidden={true} className="text-red-500 text-md text-start" id="emailError">Incorrect Email</p>
                            <input type="text" className="w-full ps-6 py-2 mb-3 bg-[#EDF6F9] rounded-[4px] text-xl text-semibold" placeholder="Candidate Email" value={candidateEmail} onChange={(e)=>{setCandidateEmail(e.target.value);verifyEmail(e)}} />
                            
                            {
                                mock==="false"?
                                <div className="flex w-full ">
                                    <input type="datetime-local" className="px-3 w-3/4 py-2 me-2 mb-3 bg-[#EDF6F9] rounded-[4px] text-xl text-semibold disabled:text-gray-200 transition-all tracking-widest" value={startTime} onChange={(e)=>{setStartTime(e.target.value);}} />
                                </div>
                                :
                                <></>
                            }
                            

                            <div className="flex w-full mb-3">
                                    <p className="text-2xl font-semibold" >Duration : </p>
                                    <div className="flex mx-auto">
                                        <button type="button" onClick={()=>{if(interviewDuration==15){return;}setInterviewDuration(interviewDuration-1)}} className="text-3xl font-bold px-2 rounded-full bg-red-300 me-6">&#8722;</button>
                                        <p className="text-3xl font-bold">{interviewDuration}</p>
                                        <p className="text-xl mt-2 px-3 font-bold">mins</p>
                                        <button type="button" onClick={()=>{if(interviewDuration==60){return;}setInterviewDuration(interviewDuration+1)}} className="text-3xl font-bold px-3 rounded-full bg-green-300 ms-6">+</button>
                                    </div>

                                    
                                </div>
                        </div>

                        {currentWindow=="SkillList" ? skillList() : null}
                        {currentWindow=="NewSkill" ? newSkillModal() : null}
                        {currentWindow=="UpdateSkill" ? updateSkillModal() : null}
                             
                    </div>  
                    
                    <button hidden={currentWindow!="SkillList"} type="button" onClick={ScheduleInterview} className="mt-auto mx-auto px-3 py-1 bg-[#006D77] w-[100px] rounded-md text-lg font-semibold text-gray-50">Schedule</button>
                        
                </div>
            </div>
        </div>
    )
}
export default Schedule;
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewHomeBackgrounnd from '../components/newHome';
const Report=()=>{
    const scores=useSelector((state)=>state.interview.questionsData);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    return(
        <div className="w-screen min-h-screen overflow-x-hidden">
            <div className="fixed top-0 left-0 z-[-10]">
            <NewHomeBackgrounnd/>
        </div>
            <div className="rounded-md w-8/12 bg-white mx-auto mt-10 p-2 h-96">
            <h2 className="text-3xl font-bold mt-4 mb-6">Interview Report</h2>
            {/* {scores && scores.map((score)=>{
                return(
                    <div key={score.id}>
                         <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
     
     <Gauge width={100} height={100} value={score.skill} startAngle={-90} endAngle={90} />
   </Stack>
                    </div>
                )
            })} */}
            
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
     
     <Gauge width={100} height={100} value={scores.score} valueMax="10" startAngle={-90} endAngle={90} />
   </Stack>
           <p>{scores.skill}</p>    
            <div className='mt-20'>
                <p className='text-lg font-bold'>Recommended Courses that you can follow for Improvement:</p>
                <a href={scores.link} className="text-blue-700 underline">{scores.link}</a>
            </div>
            </div>
           
        </div>
    )
    }
    export default Report;
import './App.css';
import Home from './homeScreen/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './authScreens/Login';
import Register from './authScreens/Register';
import Schedule from './scheduleScreen/Schedule';
import MainNew from './interviewScreen/MainNew';
import NewAuth from './authScreens/NewAuth';
import NewInterview from './interviewScreen/NewInterview';
import Interview from './interviewScreen/Interview';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
       <Route path='' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Register/>}/>
       <Route path='/schedule' element={<Schedule/>}/>
       <Route path='/interview' element={<NewInterview/>}/>
       
       <Route path='/test' element={<Interview/>}/>
       {/* <Route path="/new" element={<MainNew/>}/> */}
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

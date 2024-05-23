import { Navigate, Outlet } from "react-router-dom";

const AuthProtected=()=>{
    const success=localStorage.getItem("success");
    return (
        success ?  <Navigate to="/"/> : <Outlet/>
         )
}
export default AuthProtected;
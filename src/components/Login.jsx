import Navbar from "./Navbar";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
const Login=()=>{
    const handleSubmit=()=>{

    }
    return(
        <div className="w-full h-screen bg-gradient-to-br from-[#282f54] to-[#422f66]">
            <Navbar/>
        {/* <div className="relative">
            <div className="w-5/12 h-3/6 mx-auto my-auto rounded-md bg-white shadow-xl z-50 absolute top-32 left-96 bg-white">

            </div>
        </div> */}
        <div className="w-4/12 bg-white  rounded-xl shadow-xl mx-auto mt-12 p-4">
            <h2 className="text-2xl  font-bold mt-4">Sign in</h2>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2" className="underline text-sky-600">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
        </div>
    )
}
export default Login;